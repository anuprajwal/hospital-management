from flask import jsonify, request
import json
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.PatientManagement.patientManagementBlueprint import patient_management_bp




VALID_TEST_STATUSES = [
    "recommended",
    "payment done",
    "cancelled",
    "test processing",
    "test completed"
]


@patient_management_bp.route('/tests', methods=['POST'])
@token_required
def create_test(current_user_id, current_user_name, current_user_role):
    data = request.json

    if not data or "patient_id" not in data or "test_cost" not in data:
        return jsonify({"error": "patient_id and test_cost are required"}), 400

    patient_id = data.get("patient_id")
    test_cost = data.get("test_cost")

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO tests (patient_id, lab_technician_id, test_cost, status)
            VALUES (?, ?, ?, ?)
        """, (
            patient_id,
            None,
            test_cost,
            "recommended"
        ))

        conn.commit()

        return jsonify({
            "message": "Test created successfully",
            "test_id": cursor.lastrowid
        }), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()





@patient_management_bp.route('/tests/<int:test_id>', methods=['PUT'])
@token_required
def update_test(current_user_id, current_user_name, current_user_role, test_id):
    data = request.json

    if not data:
        return jsonify({"error": "Request body required"}), 400

    status = data.get("status")
    test_results = data.get("test_results")

    if status and status not in VALID_TEST_STATUSES:
        return jsonify({"error": "Invalid status value"}), 400

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        fields = []
        values = []

        if status:
            fields.append("status = ?")
            values.append(status)

        if test_results:
            fields.append("test_results = ?")
            values.append(json.dumps(test_results))

        if status in ["test processing", "test completed"]:
            fields.append("lab_technician_id = ?")
            values.append(current_user_id)

        if not fields:
            return jsonify({"error": "Nothing to update"}), 400

        values.append(test_id)

        query = f"""
            UPDATE tests
            SET {", ".join(fields)}
            WHERE id = ?
        """

        result = cursor.execute(query, values)

        if result.rowcount == 0:
            return jsonify({"error": "Test not found"}), 404

        conn.commit()

        return jsonify({"message": "Test updated successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()






@patient_management_bp.route('/tests', methods=['GET'])
@token_required
def get_tests(current_user_id, current_user_name, current_user_role):

    patient_id = request.args.get("patient_id")
    statuses = request.args.getlist("status")

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        query = """
            SELECT id, patient_id, lab_technician_id, test_cost,
                   test_results, status, created_on
            FROM tests
            WHERE 1=1
        """

        values = []

        if patient_id:
            query += " AND patient_id = ?"
            values.append(patient_id)

        if statuses:
            query += f" AND status IN ({','.join(['?'] * len(statuses))})"
            values.extend(statuses)

        query += " ORDER BY created_on DESC"

        cursor.execute(query, values)
        rows = cursor.fetchall()

        tests = []
        for row in rows:
            tests.append({
                "id": row[0],
                "patient_id": row[1],
                "lab_technician_id": row[2],
                "test_cost": row[3],
                "test_results": json.loads(row[4]) if row[4] else None,
                "status": row[5],
                "created_on": row[6]
            })

        return jsonify(tests), 200

    finally:
        conn.close()






@patient_management_bp.route('/tests/<int:test_id>', methods=['DELETE'])
@token_required
def delete_test(current_user_id, current_user_name, current_user_role, test_id):

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        result = cursor.execute("""
            UPDATE tests
            SET status = 'cancelled'
            WHERE id = ?
        """, (test_id,))

        if result.rowcount == 0:
            return jsonify({"error": "Test not found"}), 404

        conn.commit()

        return jsonify({"message": "Test cancelled successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()