from flask import jsonify, request
from backend.db import get_db_connection
import sqlite3
from backend.middleware.verifyToken import token_required
from backend.UsersManagement.usersBlueprint import user_management_bp


@user_management_bp.route('/change-status', methods=['PUT'])
@token_required
def update_user_status(current_user_id, current_user_name, current_role):

    if current_role not in ["Super_Admin", "Admin"]:
        return jsonify({"error": "Not authorised"}), 403


    data = request.json

    if not data:
        return jsonify({"error": "Request body required"}), 400


    user_id = data.get("user_id")
    new_status = data.get("status")

    if not user_id or not new_status:
        return jsonify({"error": "user_id and status are required"}), 400


    allowed_status = {"Frozen", "Approved"}

    if new_status not in allowed_status:
        return jsonify({
            "error": f"Invalid status. Allowed values: {list(allowed_status)}"
        }), 400


    conn = get_db_connection()

    try:
        cursor = conn.execute("""
            SELECT id, role FROM users WHERE id = ?
        """, (user_id,))

        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "User not found"}), 404


        if user["role"] in ["Super_Admin", "Admin"]:
            return jsonify({
                "error": "Cannot change status of Admin/Super_Admin"
            }), 403


        conn.execute("""
            UPDATE users
            SET status = ?
            WHERE id = ?
        """, (new_status, user_id))

        conn.commit()

        return jsonify({
            "message": f"User status updated to {new_status}"
        }), 200

    finally:
        conn.close()
