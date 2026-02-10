from flask import jsonify, request
from backend.db import get_db_connection
import sqlite3
from backend.auth.authBlueprint import auth_bp
from werkzeug.security import generate_password_hash



@auth_bp.route('/super/admin/create-account', methods=['POST'])
def createAdminAccount():
    data = request.json
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO users (user_name, password, role) VALUES (?, ?, ?)',
                     (data['name'], generate_password_hash(data['password']), data['role']))
        conn.commit()
        return jsonify({"message": "Success"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Check constraint failed"}), 400
    finally:
        conn.close()
