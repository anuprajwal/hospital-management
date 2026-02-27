from flask import jsonify
import json
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp



MAP_ROLES_MODULES = {
    'Receptionist':'Reception',
    'Lab_Incharge':'Laboratory'
}


def _inject_dynamic_options_for_reception(conn, form_fields_json):
    """For Reception forms, inject current doctors and referrers into dropdown options."""
    if not form_fields_json:
        return form_fields_json
    try:
        fields = json.loads(form_fields_json) if isinstance(form_fields_json, str) else form_fields_json
    except (TypeError, json.JSONDecodeError):
        return form_fields_json
    cursor = conn.cursor()
    for field in fields:
        if field.get("type") != "Dropdown":
            continue
        label = (field.get("label") or "").strip().lower()
        if label == "doctor":
            cursor.execute(
                "SELECT user_name FROM users WHERE role = 'Doctor' AND status = 'Approve' ORDER BY user_name"
            )
            field["options"] = [row[0] for row in cursor.fetchall()]
        elif label == "referer":
            cursor.execute(
                "SELECT user_name FROM users WHERE status = 'Approve' ORDER BY user_name"
            )
            field["options"] = [row[0] for row in cursor.fetchall()]
    return json.dumps(fields) if isinstance(form_fields_json, str) else fields


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
            form_dict = dict(zip(columns, row))
            # For Receptionist, inject current doctors/referrers into form_fields so dropdowns are up-to-date
            if MAP_ROLES_MODULES.get(current_user_role) == 'Reception' and form_dict.get('form_fields'):
                form_dict['form_fields'] = _inject_dynamic_options_for_reception(conn, form_dict['form_fields'])
            forms.append(form_dict)

        return jsonify({
            "role": current_user_role,
            "forms": forms
        }), 200

    finally:
        conn.close()
