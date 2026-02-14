from flask import jsonify, request
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp


@module_management_bp.route('/edit/<int:module_id>', methods=['PUT'])
@token_required
def update_module_description(current_user_id, current_user_name, current_role, module_id):

    if current_role != "Super_Admin":
        return jsonify({"error": "Not authorized"}), 403

    data = request.json

    if not data or "description" not in data:
        return jsonify({"error": "description is required"}), 400

    description = data.get("description")

    if not description or not description.strip():
        return jsonify({"error": "description cannot be empty"}), 400

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        result = cursor.execute(
            "UPDATE modules SET description = ? WHERE id = ?",
            (description.strip(), module_id)
        )

        if result.rowcount == 0:
            return jsonify({"error": "Module not found"}), 404

        conn.commit()

        return jsonify({
            "message": "Module description updated successfully",
            "module_id": module_id,
            "new_description": description.strip()
        }), 200

    finally:
        conn.close()
