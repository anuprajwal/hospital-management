from flask import jsonify, request
from backend.db import get_db_connection
import sqlite3
from backend.middleware.verifyToken import token_required
from backend.PricingManagement.pricingManagementBlueprint import pricing_management_bp




@pricing_management_bp.route('/create-price', methods=['POST'])
@token_required
def create_pricing(current_user_id, current_user_name, current_user_role):
    if current_user_role != "Admin":
        return jsonify({"error": "Only Admin can create pricing"}), 403

    data = request.json

    print("checkpoint1")

    if not data or "name" not in data or "price" not in data:
        return jsonify({"error": "name and price are required"}), 400

    name = data.get("name").strip()
    price = int(data.get("price"))
    description = data.get("description", "")
    status = data.get("status", True)  # default True

    # Validate price
    if not isinstance(price, (int, float)) or price < 0:
        return jsonify({"error": "Invalid price value"}), 400

    # Validate status
    if not isinstance(status, bool):
        return jsonify({"error": "status must be boolean"}), 400

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO pricing (name, price, description, status)
            VALUES (?, ?, ?, ?)
        """, (
            name,
            float(price),
            description,
            int(status)
        ))

        conn.commit()

        return jsonify({
            "message": "Pricing created successfully",
            "pricing_id": cursor.lastrowid
        }), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()




@pricing_management_bp.route('/edit-price/<int:pricing_id>', methods=['PUT'])
@token_required
def update_pricing(current_user_id, current_user_name, current_user_role, pricing_id):
    if current_user_role != "Admin":
        return jsonify({"error": "Only Admin can update pricing"}), 403

    data = request.json

    if not data:
        return jsonify({"error": "Request body required"}), 400

    fields = []
    values = []

    if "name" in data:
        fields.append("name = ?")
        values.append(data.get("name").strip())

    if "price" in data:
        price = int(data.get("price"))
        if not isinstance(price, (int, float)) or price < 0:
            return jsonify({"error": "Invalid price value"}), 400
        fields.append("price = ?")
        values.append(float(price))

    if "description" in data:
        fields.append("description = ?")
        values.append(data.get("description"))

    if "status" in data:
        status = data.get("status")
        if not isinstance(status, bool):
            return jsonify({"error": "status must be boolean"}), 400
        fields.append("status = ?")
        values.append(int(status))

    if not fields:
        return jsonify({"error": "Nothing to update"}), 400

    values.append(pricing_id)

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        query = f"""
            UPDATE pricing
            SET {", ".join(fields)}
            WHERE id = ?
        """

        result = cursor.execute(query, values)

        if result.rowcount == 0:
            return jsonify({"error": "Pricing record not found"}), 404

        conn.commit()

        return jsonify({"message": "Pricing updated successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()




@pricing_management_bp.route('/get-prices', methods=['GET'])
@token_required
def get_pricing(current_user_id, current_user_name, current_user_role):
    name_filter = request.args.get("name")
    status_filter = request.args.get("status")

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        query = """
            SELECT id, name, price, description, status, created_at
            FROM pricing
            WHERE 1=1
        """

        values = []

        # 🔹 Name filter
        if name_filter:
            query += " AND name LIKE ?"
            values.append(f"%{name_filter}%")

        # 🔹 Status filter
        if status_filter is not None and status_filter.strip().lower() != "all" and status_filter.strip() != "":
            status_filter = status_filter.strip().lower()

            if status_filter in ["true", "1"]:
                parsed_status = 1
            elif status_filter in ["false", "0"]:
                parsed_status = 0
            else:
                return jsonify({
                    "error": "Invalid status value. Use true/false/1/0/all."
                }), 400

            query += " AND status = ?"
            values.append(parsed_status)

        query += " ORDER BY created_at DESC"

        cursor.execute(query, values)
        rows = cursor.fetchall()

        pricing_list = []

        for row in rows:
            pricing_list.append({
                "id": row[0],
                "name": row[1],
                "price": row[2],
                "description": row[3],
                "status": bool(row[4]),
                "created_at": row[5]
            })

        return jsonify(pricing_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()



@pricing_management_bp.route('/delete-prices/<int:pricing_id>', methods=['DELETE'])
@token_required
def delete_pricing(current_user_id, current_user_name, current_user_role, pricing_id):

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