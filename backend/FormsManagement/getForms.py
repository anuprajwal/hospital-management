from flask import jsonify, request
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp



@module_management_bp.route('/get-available-forms', methods=['GET'])
@token_required
def get_forms_by_module(current_user_id, current_user_name, current_role):

    module_id = request.args.get('module_id')
    is_allowed = request.args.get('is_allowed')  # optional
    page = request.args.get('page', 1)
    limit = request.args.get('limit', 20)

    # ---- Validation ----
    if not module_id:
        return jsonify({"error": "module_id is required"}), 400

    try:
        module_id = int(module_id)
        page = int(page)
        limit = int(limit)

        if page < 1 or limit < 1:
            raise ValueError

    except ValueError:
        return jsonify({"error": "Invalid numeric values"}), 400


    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        # ---- Ensure module exists ----
        module = cursor.execute(
            "SELECT id FROM modules WHERE id = ?",
            (module_id,)
        ).fetchone()

        if not module:
            return jsonify({"error": "Module not found"}), 404


        # ---- Build Query ----
        query = """
            SELECT id, form_name, form_fields, is_allowed, created_on
            FROM forms
            WHERE module_id = ?
        """
        params = [module_id]

        # Optional filtering
        if is_allowed is not None:

            if is_allowed.lower() in ['true', '1']:
                query += " AND is_allowed = 1"
            elif is_allowed.lower() in ['false', '0']:
                query += " AND is_allowed = 0"
            else:
                return jsonify({"error": "Invalid is_allowed value"}), 400


        # Pagination
        offset = (page - 1) * limit
        query += " ORDER BY created_on DESC LIMIT ? OFFSET ?"
        params.extend([limit, offset])

        cursor.execute(query, params)
        forms = cursor.fetchall()


        # ---- Total Count ----
        count_query = "SELECT COUNT(*) FROM forms WHERE module_id = ?"
        count_params = [module_id]

        if is_allowed is not None:
            count_query += " AND is_allowed = ?"
            count_params.append(1 if is_allowed.lower() in ['true','1'] else 0)

        total = conn.execute(count_query, count_params).fetchone()[0]


        form_list = [
            {
                "id": row[0],
                "form_name": row[1],
                "form_fields": row[2],   # JSON string
                "is_allowed": bool(row[3]),
                "created_on": row[4]
            }
            for row in forms
        ]


        return jsonify({
            "forms": form_list,
            "module_id": module_id,
            "page": page,
            "limit": limit,
            "total": total,
            "has_next": (offset + limit) < total
        }), 200


    except Exception as e:
        return jsonify({"error": "Failed to fetch forms"}), 500

    finally:
        conn.close()
