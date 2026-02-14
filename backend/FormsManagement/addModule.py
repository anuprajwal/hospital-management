from flask import jsonify, request
from backend.db import get_db_connection
import sqlite3
from backend.middleware.verifyToken import token_required
from backend.FormsManagement.formManagementBlueprint import module_management_bp
from backend.FormsManagement.helperFunctions import normalize_bool



@module_management_bp.route('/add-module', methods=['POST'])
@token_required
def create_module(current_user_id, current_user_name, current_role):

    if current_role != "Super_Admin":
        return jsonify({"error": "Not authorized"}), 403

    data = request.json

    required_fields = ["module_name", "description", "is_active"]

    if not data or not all(field in data for field in required_fields):
        return jsonify({"error": "module_name, description, is_active required"}), 400

    if len(data['description']) > 200:
        return jsonify({"error": "description max length is 200"}), 400

    try:
        is_active = normalize_bool(data['is_active'])
    except ValueError:
        return jsonify({"error": "is_active must be true/false"}), 400

    conn = get_db_connection()

    try:
        conn.execute("""
            INSERT INTO modules (module_name, description, is_allowed)
            VALUES (?, ?, ?)
        """, (data['module_name'], data['description'], is_active))

        conn.commit()

        return jsonify({"message": "Module created successfully"}), 201

    except sqlite3.IntegrityError as e:

        if "CHECK constraint failed" in str(e):
            return jsonify({
                "error": "Invalid module_name. Check allowed values."
            }), 400

        return jsonify({"error": "Database integrity error"}), 400

    finally:
        conn.close()
