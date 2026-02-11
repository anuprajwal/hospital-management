from flask import jsonify, request
from backend.db import get_db_connection
import sqlite3
from backend.middleware.verifyToken import token_required
from backend.UsersManagement.usersBlueprint import user_management_bp


@user_management_bp.route('/overview', methods=['GET'])
@token_required
def get_users(current_user_id, current_user_name, current_role):
    if current_role not in ["Super_Admin", "Admin"]:
        return jsonify({"error": "User not authorised to view users"}), 403

    # 1. Extract and Validate query params
    try:
        limit = int(request.args.get('limit', 10))
        offset = int(request.args.get('offset', 0))
        search = request.args.get('search', '').strip()
        role_filter = request.args.get('role', 'all')

        limit = 10 if limit <= 0 or limit > 100 else limit
        offset = 0 if offset < 0 else offset
    except ValueError:
        return jsonify({"error": "limit and offset must be integers"}), 400

    conn = get_db_connection()
    try:
        # 2. Build Dynamic WHERE Clause
        # We always exclude Admin roles as per your logic
        query_conditions = ["role NOT IN (?, ?)"]
        params = ["Super_Admin", "Admin"]

        if search:
            query_conditions.append("(user_name LIKE ? OR id LIKE ?)")
            params.append(f"%{search}%")
            params.append(f"%{search}%")

        if role_filter and role_filter != 'all':
            query_conditions.append("role = ?")
            params.append(role_filter)

        where_clause = " WHERE " + " AND ".join(query_conditions)

        # 3. Get Total Count for the specific filter (Important for pagination UI)
        count_query = f"SELECT COUNT(*) as total FROM users {where_clause}"
        total_cursor = conn.execute(count_query, params)
        total_users = total_cursor.fetchone()["total"]

        # 4. Fetch Paginated & Filtered Users
        # Add limit and offset to the params list
        fetch_params = params + [limit, offset]
        fetch_query = f"""
            SELECT id, user_name, role, created_at, status
            FROM users 
            {where_clause}
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?
        """
        cursor = conn.execute(fetch_query, fetch_params)
        users = [dict(row) for row in cursor.fetchall()]

        return jsonify({
            "total_users": total_users,
            "returned_users": len(users),
            "limit": limit,
            "offset": offset,
            "users": users
        }), 200

    finally:
        conn.close()