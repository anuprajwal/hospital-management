from flask import jsonify, request
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp
from backend.FormsManagement.helperFunctions import normalize_bool


@module_management_bp.route('/toggle', methods=['PUT'])
@token_required
def toggle_module(current_user_id, current_user_name, current_role):

    if current_role != "Super_Admin":
        return jsonify({"error": "Not authorized"}), 403

    data = request.json

    if not data or 'module_id' not in data or 'status' not in data:
        return jsonify({"error": "module_id and status required"}), 400

    try:
        status = normalize_bool(data['status'])
    except ValueError:
        return jsonify({"error": "status must be true or false"}), 400

    conn = get_db_connection()

    try:
        cursor = conn.execute(
            "UPDATE modules SET is_allowed = ? WHERE id = ?",
            (status, data['module_id'])
        )

        if cursor.rowcount == 0:
            return jsonify({"error": "Module not found"}), 404

        conn.commit()

        return jsonify({
            "message": f"Module {'enabled' if status else 'disabled'} successfully"
        }), 200

    finally:
        conn.close()
