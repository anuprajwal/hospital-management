from flask import jsonify, request
import json
from backend.db import get_db_connection
from backend.middleware.verifyToken import token_required
from backend.PatientManagement.patientManagementBlueprint import patient_management_bp



@patient_management_bp.route('/create-prescription', methods=['POST'])
@token_required
def create_prescription(current_user_id, current_user_name, current_user_role):
    data = request.json

    if not data or "patient_id" not in data or "prescription" not in data:
        return jsonify({"error": "patient_id and prescription are required"}), 400

    patient_id = data.get("patient_id")
    prescription = data.get("prescription")

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO prescriptions (patient_id, doctor_id, prescription)
            VALUES (?, ?, ?)
        """, (
            patient_id,
            current_user_id,
            json.dumps(prescription)
        ))

        conn.commit()

        return jsonify({
            "message": "Prescription created successfully",
            "prescription_id": cursor.lastrowid
        }), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()





@patient_management_bp.route('/edit-prescription/<int:prescription_id>', methods=['PUT'])
@token_required
def update_prescription(current_user_id, current_user_name, current_user_role, prescription_id):
    data = request.json

    if not data or "prescription" not in data:
        return jsonify({"error": "prescription is required"}), 400

    prescription = data.get("prescription")

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        result = cursor.execute("""
            UPDATE prescriptions
            SET prescription = ?
            WHERE id = ?
        """, (
            json.dumps(prescription),
            prescription_id
        ))

        if result.rowcount == 0:
            return jsonify({"error": "Prescription not found"}), 404

        conn.commit()

        return jsonify({"message": "Prescription updated successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()




@patient_management_bp.route('/prescriptions/<int:patient_id>', methods=['GET'])
@token_required
def get_prescriptions(current_user_id, current_user_name, current_user_role, patient_id):

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        cursor.execute("""
            SELECT id, patient_id, doctor_id, prescription, created_on
            FROM prescriptions
            WHERE patient_id = ?
            ORDER BY created_on DESC
        """, (patient_id,))

        rows = cursor.fetchall()

        prescriptions = []
        for row in rows:
            prescriptions.append({
                "id": row[0],
                "patient_id": row[1],
                "doctor_id": row[2],
                "prescription": json.loads(row[3]),
                "created_on": row[4]
            })

        return jsonify(prescriptions), 200

    finally:
        conn.close()





@patient_management_bp.route('/delete-prescription/<int:prescription_id>', methods=['DELETE'])
@token_required
def delete_prescription(current_user_id, current_user_name, current_user_role, prescription_id):

    conn = get_db_connection()

    try:
        cursor = conn.cursor()

        result = cursor.execute("""
            DELETE FROM prescriptions
            WHERE id = ?
        """, (prescription_id,))

        if result.rowcount == 0:
            return jsonify({"error": "Prescription not found"}), 404

        conn.commit()

        return jsonify({"message": "Prescription deleted successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()