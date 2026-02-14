from flask import jsonify, request
from backend.db import get_db_connection
import sqlite3
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp

@module_management_bp.route('/module', methods=['DELETE'])
@token_required
def delete_module(current_user_id, current_user_name, current_role):

    if current_role != "Super_Admin":
        return jsonify({"error": "Not authorized"}), 403

    data = request.json

    if not data or 'module_id' not in data:
        return jsonify({"error": "module_id required"}), 400

    conn = get_db_connection()

    try:
        cursor = conn.execute(
            "DELETE FROM modules WHERE id = ?",
            (data['module_id'],)
        )

        if cursor.rowcount == 0:
            return jsonify({"error": "Module not found"}), 404

        conn.commit()

        return jsonify({"message": "Module deleted successfully"}), 200

    finally:
        conn.close()
