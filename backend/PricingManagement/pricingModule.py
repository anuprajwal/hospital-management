from flask import jsonify, request
from backend.db import get_db_connection
import sqlite3
from backend.middleware.verifyToken import token_required
from backend.PricingManagement.pricingManagementBlueprint import pricing_management_bp
import json




@pricing_management_bp.route('/create-test', methods=['POST'])
@token_required
def create_test(current_user_id, current_user_name, current_user_role):

    data = request.get_json()

    name = data.get("name")
    category = data.get("category")
    status = data.get("status")
    price = data.get("price")
    description = data.get("description")
    parameters = data.get("parameters")

    if isinstance(parameters, list):
        parameters = json.dumps(parameters)

    conn = get_db_connection()

    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO available_test 
            (name, category, status, price, description, parameters)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (name, category, status, price, description, parameters))

        conn.commit()

        return jsonify({"message": "Test created successfully"}), 201

    except sqlite3.IntegrityError as e:
        return jsonify({"error": str(e)}), 400

    finally:
        conn.close()


@pricing_management_bp.route('/update-test/<int:test_id>', methods=['PUT'])
@token_required
def update_test(current_user_id, current_user_name, current_user_role, test_id):

    data = request.get_json()

    allowed_fields = [
        "name", "category", "status",
        "price", "description", "parameters"
    ]

    updates = []
    params = []

    for field in allowed_fields:
        if field in data:

            value = data[field]

            # Validate category
            if field == "category":
                if value not in ["laboratory_tests", "package"]:
                    return jsonify({"error": "Invalid category"}), 400

            # Validate status
            if field == "status":
                if value not in [0, 1]:
                    return jsonify({"error": "Invalid status"}), 400

            # Convert parameters list → JSON
            if field == "parameters":
                if isinstance(value, list):
                    value = json.dumps(value)
                elif value is not None:
                    return jsonify({"error": "Parameters must be a list"}), 400

            updates.append(f"{field} = ?")
            params.append(value)

    if not updates:
        return jsonify({"error": "No valid fields to update"}), 400

    params.append(test_id)

    query = f"""
        UPDATE available_test
        SET {', '.join(updates)}
        WHERE id = ?
    """

    conn = get_db_connection()

    try:
        cursor = conn.cursor()
        cursor.execute(query, params)
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Test not found"}), 404

        return jsonify({"message": "Test updated successfully"}), 200

    finally:
        conn.close()


@pricing_management_bp.route('/get-tests', methods=['GET'])
@token_required
def get_tests(current_user_id, current_user_name, current_user_role):

    name = request.args.get("name")
    category = request.args.get("category")
    status = request.args.get("status")
    min_price = request.args.get("min_price")
    max_price = request.args.get("max_price")
    created_from = request.args.get("created_from")
    created_to = request.args.get("created_to")

    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    sort_by = request.args.get("sort_by", "created_at")
    order = request.args.get("order", "desc").lower()

    offset = (page - 1) * limit

    valid_sort_columns = [
        "id", "name", "category",
        "status", "price", "created_at"
    ]

    if sort_by not in valid_sort_columns:
        return jsonify({"error": "Invalid sort column"}), 400

    if order not in ["asc", "desc"]:
        return jsonify({"error": "Invalid order"}), 400

    query = "SELECT * FROM available_test WHERE 1=1"
    count_query = "SELECT COUNT(*) FROM available_test WHERE 1=1"
    params = []

    # Filters

    if name:
        query += " AND name LIKE ?"
        count_query += " AND name LIKE ?"
        params.append(f"%{name}%")

    if category:
        query += " AND category = ?"
        count_query += " AND category = ?"
        params.append(category)

    if status is not None:
        status_str = str(status).strip().lower()

        # If "all", do not apply any status filter
        if status_str == "all":
            pass

        elif status_str in ["1", "true"]:
            query += " AND status = ?"
            count_query += " AND status = ?"
            params.append(1)

        elif status_str in ["0", "false"]:
            query += " AND status = ?"
            count_query += " AND status = ?"
            params.append(0)

        else:
            return jsonify({
                "error": "Invalid status filter. Use 0, 1, true, false, or all."
            }), 400

    if min_price:
        try:
            min_price = float(min_price)
            query += " AND price >= ?"
            count_query += " AND price >= ?"
            params.append(min_price)
        except ValueError:
            return jsonify({"error": "Invalid min_price"}), 400

    if max_price:
        try:
            max_price = float(max_price)
            query += " AND price <= ?"
            count_query += " AND price <= ?"
            params.append(max_price)
        except ValueError:
            return jsonify({"error": "Invalid max_price"}), 400

    if created_from:
        query += " AND created_at >= ?"
        count_query += " AND created_at >= ?"
        params.append(created_from)

    if created_to:
        query += " AND created_at <= ?"
        count_query += " AND created_at <= ?"
        params.append(created_to)

    query += f" ORDER BY {sort_by} {order}"
    query += " LIMIT ? OFFSET ?"

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        # Total count
        cursor.execute(count_query, params)
        total_records = cursor.fetchone()[0]

        # Paginated query
        cursor.execute(query, params + [limit, offset])
        rows = cursor.fetchall()

        tests = []
        for row in rows:
            test = dict(row)

            # Convert JSON string → list
            if test.get("parameters"):
                try:
                    test["parameters"] = json.loads(test["parameters"])
                except:
                    test["parameters"] = []

            tests.append(test)

        return jsonify({
            "total_records": total_records,
            "page": page,
            "limit": limit,
            "total_pages": (total_records + limit - 1) // limit,
            "data": tests
        }), 200

    finally:
        conn.close()

@pricing_management_bp.route('/delete-test/<int:test_id>', methods=['DELETE'])
@token_required
def delete_test(current_user_id, current_user_name, current_user_role, test_id):

    conn = get_db_connection()

    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM available_test WHERE id = ?", (test_id,))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Test not found"}), 404

        return jsonify({"message": "Test deleted successfully"}), 200

    finally:
        conn.close()

    if current_user_role != "Admin":
        return jsonify({"error": "Only Admin can delete pricing"}), 403

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        result = cursor.execute("""
            DELETE FROM pricing
            WHERE id = ?
        """, (pricing_id,))

        if result.rowcount == 0:
            return jsonify({"error": "Pricing record not found"}), 404

        conn.commit()

        return jsonify({"message": "Pricing deleted successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()