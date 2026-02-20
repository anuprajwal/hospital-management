from flask import jsonify, request
from backend.db import get_db_connection
import sqlite3
from backend.middleware.verifyToken import token_required
from backend.PricingManagement.pricingManagementBlueprint import pricing_management_bp




@pricing_management_bp.route('/pricing', methods=['POST'])
@token_required
def create_pricing(current_user_id, current_user_name, current_user_role):

    if current_user_role != "Admin":
        return jsonify({"error": "Only Admin can create pricing"}), 403

    data = request.json

    if not data or "name" not in data or "price" not in data:
        return jsonify({"error": "name and price are required"}), 400

    name = data.get("name").strip()
    price = data.get("price")
    description = data.get("description", "")

    if not isinstance(price, (int, float)) or price < 0:
        return jsonify({"error": "Invalid price value"}), 400

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO pricing (name, price, description)
            VALUES (?, ?, ?)
        """, (
            name,
            float(price),
            description
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




@pricing_management_bp.route('/pricing/<int:pricing_id>', methods=['PUT'])
@token_required
def update_pricing(current_user_id, current_user_name, current_user_role, pricing_id):

    if current_user_role != "Admin":
        return jsonify({"error": "Only Admin can update pricing"}), 403

    data = request.json

    if not data:
        return jsonify({"error": "Request body required"}), 400

    name = data.get("name")
    price = data.get("price")
    description = data.get("description")

    fields = []
    values = []

    if name is not None:
        fields.append("name = ?")
        values.append(name.strip())

    if price is not None:
        if not isinstance(price, (int, float)) or price < 0:
            return jsonify({"error": "Invalid price value"}), 400
        fields.append("price = ?")
        values.append(float(price))

    if description is not None:
        fields.append("description = ?")
        values.append(description)

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




@pricing_management_bp.route('/pricing', methods=['GET'])
@token_required
def get_pricing(current_user_id, current_user_name, current_user_role):

    name_filter = request.args.get("name")

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        query = """
            SELECT id, name, price, description, created_at
            FROM pricing
            WHERE 1=1
        """

        values = []

        if name_filter:
            query += " AND name LIKE ?"
            values.append(f"%{name_filter}%")

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
                "created_at": row[4]
            })

        return jsonify(pricing_list), 200

    finally:
        conn.close()




@pricing_management_bp.route('/pricing/<int:pricing_id>', methods=['DELETE'])
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