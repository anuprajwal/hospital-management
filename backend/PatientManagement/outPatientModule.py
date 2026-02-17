from flask import jsonify, request
import json
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.PatientManagement.patientManagementBlueprint import patient_management_bp


# ===============================
# CREATE - Insert OutPatient
# ===============================
@patient_management_bp.route('/create-outpatient', methods=['POST'])
@token_required
def create_outpatient(current_user_id, current_user_name, current_user_role):

    data = request.json

    if not data or "form_data" not in data or "patient_name" not in data:
        return jsonify({"error": "form_data and patient_name are required"}), 400

    form_data = data.get("form_data")
    patient_name = data.get("patient_name")

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO outPatient (user_id, patient_name, form_data, status)
            VALUES (?, ?, ?, ?)
        """, (
            current_user_id,
            patient_name,
            json.dumps(form_data),
            "Created"
        ))

        conn.commit()

        return jsonify({
            "message": "OutPatient record created successfully"
        }), 201

    finally:
        conn.close()


# ===============================
# UPDATE - Change form_data
# ===============================
@patient_management_bp.route('/edit-outpatient/<int:outpatient_id>', methods=['PUT'])
@token_required
def update_outpatient(current_user_id, current_user_name, current_user_role, outpatient_id):

    data = request.json

    if not data or "form_data" not in data or "patient_name" not in data:
        return jsonify({"error": "form_data, patient_name is required"}), 400

    form_data = data.get("form_data")
    patient_name = data.get("patient_name")

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        result = cursor.execute("""
            UPDATE outPatient
            SET form_data = ?, patient_name = ?
            WHERE id = ?
        """, (
            json.dumps(form_data),
            patient_name,
            outpatient_id
        ))

        if result.rowcount == 0:
            return jsonify({"error": "Record not found"}), 404

        conn.commit()

        return jsonify({
            "message": "OutPatient record updated successfully"
        }), 200

    finally:
        conn.close()


# ===============================
# GET - Paginated, Only Valid
# ===============================
@patient_management_bp.route('/get-outpatients', methods=['GET'])
@token_required
def get_outpatients(current_user_id, current_user_name, current_user_role):
    # Get pagination, search, and status from query params
    page = request.args.get("page", 1, type=int)
    limit = request.args.get("limit", 10, type=int)
    search_query = request.args.get("search", "").strip()
    status_filter = request.args.get("status", "").strip()

    offset = (page - 1) * limit
    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        # Base query components
        query = "SELECT * FROM outPatient WHERE 1=1"
        params = []

        # 1. Handle Search (Partial name match)
        if search_query:
            query += " AND patient_name LIKE ?"
            params.append(f"%{search_query}%")

        # 2. Handle Status Filter
        # If no status is provided, you might want to default to 'Created' 
        # or remove this block to show all statuses.
        if status_filter:
            query += " AND status = ?"
            params.append(status_filter)
        else:
            # Default behavior: exclude 'Deleted' unless specifically requested
            query += " AND status != 'Deleted'"

        # 3. Add Ordering and Pagination
        query += " ORDER BY created_on DESC LIMIT ? OFFSET ?"
        params.extend([limit, offset])

        cursor.execute(query, tuple(params))
        rows = cursor.fetchall()

        # Get total count for frontend pagination UI
        count_query = "SELECT COUNT(*) FROM outPatient WHERE 1=1"
        count_params = []
        if search_query:
            count_query += " AND patient_name LIKE ?"
            count_params.append(f"%{search_query}%")
        if status_filter:
            count_query += " AND status = ?"
            count_params.append(status_filter)
        
        cursor.execute(query, tuple(params))
        rows = cursor.fetchall()

        # Save columns immediately
        columns = [column[0] for column in cursor.description]

        # Now run count query
        cursor.execute(count_query, tuple(count_params))
        total_count = cursor.fetchone()[0]

        results = []
        for row in rows:
            row_dict = dict(zip(columns, row))

            if "form_data" in row_dict and isinstance(row_dict["form_data"], str):
                row_dict["form_data"] = json.loads(row_dict["form_data"])

            results.append(row_dict)


        return jsonify({
            "page": page,
            "limit": limit,
            "total_records": total_count,
            "data": results
        }), 200

    except Exception as e:
        print(f"Database Error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    finally:
        conn.close()

# ===============================
# DELETE - Soft Delete
# ===============================
@patient_management_bp.route('/delete-outpatient/<int:outpatient_id>', methods=['DELETE'])
@token_required
def delete_outpatient(current_user_id, current_user_name, current_user_role, outpatient_id):

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        result = cursor.execute("""
            UPDATE outPatient
            SET status = 'Deleted'
            WHERE id = ?
        """, (outpatient_id,))

        if result.rowcount == 0:
            return jsonify({"error": "Record not found"}), 404

        conn.commit()

        return jsonify({
            "message": "OutPatient record marked as Deleted"
        }), 200

    finally:
        conn.close()


# ===============================
# MOVE OutPatient -> InPatient
# ===============================
@patient_management_bp.route('/outpatient/move-to-inpatient', methods=['POST'])
@token_required
def move_to_inpatient(current_user_id, current_user_name, current_user_role):

    data = request.json

    if not data or "user_id" not in data:
        return jsonify({"error": "user_id is required"}), 400

    try:
        user_id = int(data.get("user_id"))
    except ValueError:
        return jsonify({"error": "Invalid user_id"}), 400

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        # Fetch all VALID outpatient records for that user
        cursor.execute("""
            SELECT user_id, patient_name, form_id, form_data, status
            FROM outPatient
            WHERE user_id = ?
        """, (user_id,))

        rows = cursor.fetchall()

        if not rows:
            return jsonify({"error": "No valid outpatient records found"}), 404

        # Insert into inPatient table
        for row in rows:
            cursor.execute("""
                INSERT INTO inPatient (user_id, patient_name, form_data, status)
                VALUES (?, ?, ?, ?)
            """, (
                row[0],  # user_id
                row[1],
                row[3],  # form_data
                row[4]   # status
            ))

        conn.commit()

        return jsonify({
            "message": "Records moved to InPatient successfully",
            "moved_records": len(rows)
        }), 201

    finally:
        conn.close()



# ===============================
# UPDATE Patient Status
# ===============================
@patient_management_bp.route('/outpatient/change-status', methods=['PUT'])
@token_required
def change_patient_status(current_user_id, current_user_name, current_user_role):

    data = request.json

    if not data or "user_id" not in data or "status" not in data:
        return jsonify({"error": "user_id and status are required"}), 400

    try:
        user_id = int(data.get("user_id"))
    except ValueError:
        return jsonify({"error": "Invalid user_id"}), 400

    status = data.get("status").strip()

    if not status:
        return jsonify({"error": "Status cannot be empty"}), 400

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        result = cursor.execute("""
            UPDATE outPatient
            SET status = ?
            WHERE user_id = ?
        """, (status, user_id))

        if result.rowcount == 0:
            return jsonify({"error": "No patient record found"}), 404

        conn.commit()

        return jsonify({
            "message": "Patient status updated successfully",
            "user_id": user_id,
            "new_status": status
        }), 200

    finally:
        conn.close()
