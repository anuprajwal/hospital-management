from flask import request, jsonify
import json
from backend.PharmacyManagement.pharmacyManagementBP import pharmacy_management_bp
from backend.middleware.verifyToken import token_required
from backend.db import get_db_connection


# --- CREATE (POST) ---
@pharmacy_management_bp.route('/drugs', methods=['POST'])
@token_required
def add_drug(current_user_id, current_user_name, current_role):
    data = request.get_json()
    conn = get_db_connection()
    
    try:
        conn.execute(
            """INSERT INTO available_drugs 
               (name, expiry_date, drug_form, manufacturer_name, buying_price, selling_price, quantity, meta_data) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (data['name'], data['expiry_date'], data['drug_form'], data['manufacturer_name'], 
             data['buying_price'], data['selling_price'], data['quantity'], json.dumps(data.get('meta_data', {})))
        )
        conn.commit()
        return jsonify({"message": "Drug added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        conn.close()

# --- READ (GET with Pagination & Filters) ---
@pharmacy_management_bp.route('/drugs', methods=['GET'])
@token_required
def get_drugs(current_user_id, current_user_name, current_role):
    conn = get_db_connection()
    
    # 1. Get Params with Defaults
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    offset = (page - 1) * limit
    
    # Filters
    name = request.args.get('name')
    manufacturer = request.args.get('manufacturer')
    expiry_before = request.args.get('expiry_before')

    query = "SELECT * FROM available_drugs WHERE 1=1"
    params = []

    if name:
        query += " AND name LIKE ?"
        params.append(f"%{name}%")
    if manufacturer:
        query += " AND manufacturer_name LIKE ?"
        params.append(f"%{manufacturer}%")
    if expiry_before:
        query += " AND expiry_date <= ?"
        params.append(expiry_before)

    try:
        # Get total count for stats
        count_query = query.replace("SELECT *", "SELECT COUNT(*)")
        total_records = conn.execute(count_query, params).fetchone()[0]

        # Get paginated data
        query += " LIMIT ? OFFSET ?"
        params.extend([limit, offset])
        cursor = conn.execute(query, params)
        
        drugs = []
        for row in cursor.fetchall():
            drug = dict(row)
            drug['meta_data'] = json.loads(drug['meta_data']) if drug['meta_data'] else {}
            drugs.append(drug)

        return jsonify({
            "total_records": total_records,
            "page": page,
            "limit": limit,
            "total_pages": (total_records + limit - 1) // limit,
            "data": drugs
        }), 200
    finally:
        conn.close()

# --- UPDATE (PUT) ---
@pharmacy_management_bp.route('/drugs/<int:drug_id>', methods=['PUT'])
@token_required
def update_drug(current_user_id, current_user_name, current_role, drug_id):
    data = request.get_json()
    conn = get_db_connection()
    
    try:
        conn.execute(
            """UPDATE available_drugs SET 
               name=?, expiry_date=?, drug_form=?, manufacturer_name=?, 
               buying_price=?, selling_price=?, quantity=?, meta_data=?
               WHERE id=?""",
            (data['name'], data['expiry_date'], data['drug_form'], data['manufacturer_name'],
             data['buying_price'], data['selling_price'], data['quantity'], 
             json.dumps(data.get('meta_data', {})), drug_id)
        )
        conn.commit()
        return jsonify({"message": "Drug updated successfully"}), 200
    finally:
        conn.close()

# --- DELETE ---
@pharmacy_management_bp.route('/drugs/<int:drug_id>', methods=['DELETE'])
@token_required
def delete_drug(current_user_id, current_user_name, current_role, drug_id):
    conn = get_db_connection()
    try:
        conn.execute("DELETE FROM available_drugs WHERE id=?", (drug_id,))
        conn.commit()
        return jsonify({"message": "Drug deleted successfully"}), 200
    finally:
        conn.close()


@pharmacy_management_bp.route('/prescriptions', methods=['GET'])
@token_required
def get_prescriptions(current_user_id, current_user_name, current_role):

    conn = get_db_connection()
    try:
        cursor = conn.cursor()

        patient_name = request.args.get('patient_name')
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=10, type=int)

        if page < 1:
            page = 1
        if limit < 1:
            limit = 10

        offset = (page - 1) * limit

        query = """
        SELECT 
            prescriptions.*,
            outPatient.patient_name
        FROM prescriptions
        JOIN outPatient
            ON prescriptions.patient_id = outPatient.id
        """

        filters = []
        params = []

        # patient name filter
        if patient_name:
            filters.append("outPatient.patient_name LIKE ?")
            params.append(f"%{patient_name}%")

        if filters:
            query += " WHERE " + " AND ".join(filters)

        query += """
        ORDER BY prescriptions.created_on DESC
        LIMIT ? OFFSET ?
        """

        params.extend([limit, offset])

        cursor.execute(query, params)

        rows = cursor.fetchall()

        # convert sqlite Row → dict
        data = [dict(row) for row in rows]

        # total count
        count_query = """
        SELECT COUNT(*)
        FROM prescriptions
        JOIN outPatient
            ON prescriptions.patient_id = outPatient.id
        """

        if filters:
            count_query += " WHERE " + " AND ".join(filters)

        cursor.execute(count_query, params[:-2] if filters else [])
        total = cursor.fetchone()[0]

        return jsonify({
            "data": data,
            "pagination": {
                "page": page,
                "limit": limit,
                "total_records": total,
                "total_pages": (total + limit - 1) // limit
            }
        }), 200

    finally:
        conn.close()