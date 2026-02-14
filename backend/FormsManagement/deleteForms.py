from flask import jsonify, request
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp


@module_management_bp.route('/form', methods=['DELETE'])
@token_required
def delete_form(current_user_id, current_user_name, current_role):

    if current_role != "Super_Admin":
        return jsonify({"error": "Not authorized"}), 403

    form_id = request.args.get("form_id")

    if not form_id:
        return jsonify({"error": "form_id required"}), 400

    try:
        form_id = int(form_id)
    except ValueError:
        return jsonify({"error": "Invalid form_id"}), 400


    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        result = cursor.execute(
            "DELETE FROM forms WHERE id=?",
            (form_id,)
        )

        if result.rowcount == 0:
            return jsonify({"error": "Form not found"}), 404

        conn.commit()

        return jsonify({"message": "Form deleted successfully"}), 200

    finally:
        conn.close()
