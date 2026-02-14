from flask import jsonify, request
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp



@module_management_bp.route('/get-available-modules', methods=['GET'])
@token_required
def get_modules(current_user_id, current_user_name, current_role):

    # Optional: allow all logged-in users
    # If you want only Super_Admin, uncomment below:
    # if current_role != "Super_Admin":
    #     return jsonify({"error": "Not authorized"}), 403

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        # ---- Query Params ----
        is_allowed = request.args.get('is_allowed')  # true / false
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))

        offset = (page - 1) * limit

        query = "SELECT id, module_name, description, is_allowed, created_at FROM modules"
        params = []

        # ---- Filtering ----
        if is_allowed is not None:
            if is_allowed.lower() in ['true', '1']:
                query += " WHERE is_allowed = 1"
            elif is_allowed.lower() in ['false', '0']:
                query += " WHERE is_allowed = 0"
            else:
                return jsonify({"error": "Invalid is_allowed value"}), 400

        # ---- Sorting + Pagination ----
        query += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
        params.extend([limit, offset])

        cursor.execute(query, params)
        modules = cursor.fetchall()

        # Count total (for frontend pagination)
        count_query = "SELECT COUNT(*) FROM modules"
        if is_allowed is not None:
            count_query += " WHERE is_allowed = ?" 
            count_val = 1 if is_allowed.lower() in ['true','1'] else 0
            total = conn.execute(count_query, (count_val,)).fetchone()[0]
        else:
            total = conn.execute(count_query).fetchone()[0]

        module_list = [
            {
                "id": row[0],
                "module_name": row[1],
                "description": row[2],
                "is_allowed": bool(row[3]),
                "created_at": row[4]
            }
            for row in modules
        ]

        return jsonify({
            "modules": module_list,
            "page": page,
            "limit": limit,
            "total": total,
            "has_next": (offset + limit) < total
        }), 200

    except Exception as e:
        return jsonify({"error": "Failed to fetch modules"}), 500

    finally:
        conn.close()
