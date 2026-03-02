from flask import jsonify, request
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp
from backend.FormsManagement.helperFunctions import normalize_bool


@module_management_bp.route('/rename-form', methods=['PUT'])
@token_required
def rename_form(current_user_id, current_user_name, current_role):

    if current_role != "Super_Admin" and current_role!="Admin":
        return jsonify({"error": "Not authorized"}), 403

    data = request.json

    if not data or 'form_id' not in data or 'form_name' not in data:
        return jsonify({"error": "form_id and form_name required"}), 400

    form_name = data['form_name'].strip()

    if not form_name:
        return jsonify({"error": "form_name cannot be empty"}), 400

    conn = get_db_connection()

    try:
        cursor = conn.execute(
            "UPDATE forms SET form_name = ? WHERE id = ?",
            (form_name, data['form_id'])
        )

        if cursor.rowcount == 0:
            return jsonify({"error": "Form not found"}), 404

        conn.commit()

        return jsonify({
            "message": "Form renamed successfully"
        }), 200

    finally:
        conn.close()