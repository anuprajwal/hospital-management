from flask import jsonify, request
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp
from backend.FormsManagement.helperFunctions import validate_fields
import json



# @module_management_bp.route('/form-create', methods=['POST'])
# @token_required
# def create_form(current_user_id, current_user_name, current_role):

#     if current_role != "Super_Admin" and current_role!="Admin":
#         return jsonify({"error": "Not authorized"}), 403

#     data = request.json

#     required = ["form_name", "fields", "module_id"]

#     if not data or not all(k in data for k in required):
#         return jsonify({"error": "form_name, fields, module_id required"}), 400

#     try:
#         module_id = int(data["module_id"])
#         validate_fields(data["fields"])
#         fields_json = json.dumps(data["fields"])

#     except ValueError as e:
#         return jsonify({"error": str(e)}), 400


#     conn = get_db_connection()

#     try:
#         cursor = conn.cursor()

#         # Check module exists
#         module = cursor.execute(
#             "SELECT id FROM modules WHERE id=?",
#             (module_id,)
#         ).fetchone()

#         if not module:
#             return jsonify({"error": "Module not found"}), 404


#         # Prevent duplicate form
#         existing = cursor.execute(
#             "SELECT id FROM forms WHERE module_id=? AND form_name=?",
#             (module_id, data["form_name"])
#         ).fetchone()

#         if existing:
#             return jsonify({
#                 "error": "Form already exists. Use update."
#             }), 409


#         cursor.execute("""
#             INSERT INTO forms (module_id, form_name, form_fields)
#             VALUES (?, ?, ?)
#         """, (module_id, data["form_name"], fields_json))

#         conn.commit()

#         return jsonify({"message": "Form created successfully"}), 201

#     finally:
#         conn.close()


# @module_management_bp.route('/form-edit', methods=['PUT'])
# @token_required
# def update_form(current_user_id, current_user_name, current_role):

#     if current_role != "Super_Admin" and current_role!="Admin":
#         return jsonify({"error": "Not authorized"}), 403

#     data = request.json

#     required = ["form_name", "fields", "module_id"]

#     if not data or not all(k in data for k in required):
#         return jsonify({"error": "form_name, fields, module_id required"}), 400

#     try:
#         module_id = int(data["module_id"])
#         validate_fields(data["fields"])
#         fields_json = json.dumps(data["fields"])

#     except ValueError as e:
#         return jsonify({"error": str(e)}), 400


#     conn = get_db_connection()

#     try:
#         cursor = conn.cursor()

#         result = cursor.execute("""
#             UPDATE forms
#             SET form_fields = ?
#             WHERE module_id = ? AND form_name = ?
#         """, (fields_json, module_id, data["form_name"]))

#         if result.rowcount == 0:
#             return jsonify({"error": "Form not found"}), 404

#         conn.commit()

#         return jsonify({"message": "Form updated successfully"}), 200

#     finally:
#         conn.close()


@module_management_bp.route('/form-save', methods=['POST'])
@token_required
def save_form(current_user_id, current_user_name, current_role):

    if current_role not in ["Super_Admin", "Admin"]:
        return jsonify({"error": "Not authorized"}), 403

    data = request.json
    required = ["form_name", "fields", "module_id"]

    if not data or not all(k in data for k in required):
        return jsonify({"error": "form_name, fields, module_id required"}), 400

    try:
        module_id = int(data["module_id"])
        form_name = data["form_name"].strip()

        if not form_name:
            return jsonify({"error": "form_name cannot be empty"}), 400

        validate_fields(data["fields"])
        fields_json = json.dumps(data["fields"])

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        # ✅ Check if module exists
        module = cursor.execute(
            "SELECT id FROM modules WHERE id=?",
            (module_id,)
        ).fetchone()

        if not module:
            return jsonify({"error": "Module not found"}), 404

        # ✅ Check if form exists
        existing = cursor.execute(
            "SELECT id FROM forms WHERE module_id=? AND form_name=?",
            (module_id, form_name)
        ).fetchone()

        if existing:
            # 🔁 UPDATE
            cursor.execute("""
                UPDATE forms
                SET form_fields = ?
                WHERE module_id = ? AND form_name = ?
            """, (fields_json, module_id, form_name))

            message = "Form updated successfully"
            status_code = 200

        else:
            # ➕ CREATE
            cursor.execute("""
                INSERT INTO forms (module_id, form_name, form_fields)
                VALUES (?, ?, ?)
            """, (module_id, form_name, fields_json))

            message = "Form created successfully"
            status_code = 201

        conn.commit()

        return jsonify({"message": message}), status_code

    finally:
        conn.close()