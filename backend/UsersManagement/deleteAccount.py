from flask import jsonify, request
from backend.db import get_db_connection
import sqlite3
from backend.middleware.verifyToken import token_required
from backend.UsersManagement.usersBlueprint import user_management_bp

@user_management_bp.route('/delete/<int:user_id>', methods=['DELETE'])
@token_required
def delete_user(current_user_id, current_user_name, current_role, user_id):

    if current_role != "Super_Admin":
        return jsonify({"error": "Only Super_Admin can delete users"}), 403

    # Prevent self deletion
    if current_user_id == user_id:
        return jsonify({"error": "You cannot delete your own account"}), 400


    conn = get_db_connection()

    try:
        # Check if user exists and role
        cursor = conn.execute("""
            SELECT role FROM users WHERE id = ?
        """, (user_id,))
        
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "User not found"}), 404

        if user["role"] in ["Super_Admin", "Admin"]:
            return jsonify({"error": "Cannot delete Admin or Super_Admin"}), 403


        conn.execute("DELETE FROM users WHERE id = ?", (user_id,))
        conn.commit()

        return jsonify({"message": "User deleted successfully"}), 200

    finally:
        conn.close()
