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
    if current_role not in ("Super_Admin", "Admin"):
        return jsonify({"error": "User not authorised to create account"}), 403

    data = request.get_json(silent=True) or {}
    name = str(data.get('name') or '').strip()
    password = data.get('password')
    role = str(data.get('role') or '').strip()
    status_raw = data.get('status')

    # Normalise status: DB expects exactly 'Approve' or 'Frozen'
    if status_raw in (True, 'true', 'True', 1):
        status = 'Approve'
    elif status_raw in (False, 'false', 'False', 0):
        status = 'Frozen'
    else:
        status = str(status_raw or '').strip()
        if status.lower() in ('approve', 'approved'):
            status = 'Approve'
        elif status.lower() == 'frozen':
            status = 'Frozen'

    if not name:
        return jsonify({"error": "Username (name) is required"}), 400
    if not password:
        return jsonify({"error": "Password is required"}), 400
    if not role:
        return jsonify({"error": "Role is required"}), 400
    if role not in ACCEPTABLE_ROLES:
        return jsonify({"error": f"Role must be one of: {', '.join(ACCEPTABLE_ROLES)}"}), 400
    if status not in ('Approve', 'Frozen'):
        return jsonify({"error": "Status must be 'Approve' or 'Frozen'"}), 400

    conn = get_db_connection()
    try:
        conn.execute(
            'INSERT INTO users (user_name, password, status, role) VALUES (?, ?, ?, ?)',
            (name, generate_password_hash(password), status, role)
        )
        conn.commit()
        return jsonify({"message": "Success"}), 201
    except sqlite3.IntegrityError as e:
        err_msg = str(e)
        if 'UNIQUE' in err_msg or 'user_name' in err_msg:
            return jsonify({"error": "Username already exists"}), 400
        if 'CHECK' in err_msg:
            return jsonify({
                "error": "Invalid value for role or status. Role must be one of: Super_Admin, Receptionist, Lab_Incharge, Admin, Doctor. Status must be Approve or Frozen.",
                "detail": err_msg
            }), 400
        return jsonify({"error": "Database constraint failed", "detail": err_msg}), 400
    finally:
        conn.close()
