from flask import jsonify, request
from backend.db import get_db_connection
import sqlite3
from backend.auth.authBlueprint import auth_bp
from backend.roles import ACCEPTABLE_ROLES
from werkzeug.security import generate_password_hash
from backend.middleware.verifyToken import token_required



@auth_bp.route('/create-account', methods=['POST'])
@token_required
def createAccount(current_user_id, current_user_name, current_role):
    if (current_role != "Super_Admin"):
        return jsonify({"error": "user not authorised to create account"}), 400

    data = request.json

    if data['role'] not in ACCEPTABLE_ROLES:
        return jsonify({"error": "role is not acceptable"}), 400

    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO users (user_name, password, status, role) VALUES (?, ?, ?, ?)',
                     (data['name'], generate_password_hash(data['password']), data['status'], data['role']))
        conn.commit()
        return jsonify({"message": "Success"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Check constraint failed"}), 400
    finally:
        conn.close()
