from flask import jsonify
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp



MAP_ROLES_MODULES = {
    'Receptionist':'Reception',
    'Lab_Incharge':'Laboratory'
}


@module_management_bp.route('/forms/by-role', methods=['GET'])
@token_required
def get_forms_by_role(current_user_id, current_user_name, current_user_role):

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        print('role:', current_user_role)

        cursor.execute("""
            SELECT f.*
            FROM forms f
            JOIN modules m ON f.module_id = m.id
            WHERE m.module_name = ?
        """, (MAP_ROLES_MODULES[current_user_role],))

        rows = cursor.fetchall()
        print("out:", rows)

        if not rows:
            return jsonify({"message": "No forms found"}), 404

        # Convert rows to list of dict
        forms = []
        columns = [column[0] for column in cursor.description]

        for row in rows:
            forms.append(dict(zip(columns, row)))

        return jsonify({
            "role": current_user_role,
            "forms": forms
        }), 200

    finally:
        conn.close()
