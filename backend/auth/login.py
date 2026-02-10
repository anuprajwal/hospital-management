from flask import jsonify, request
from backend.db import get_db_connection
from backend.auth.authBlueprint import auth_bp
from werkzeug.security import check_password_hash
import jwt
import datetime
from flask import current_app



def create_jwt(user_obj):
    payload = {
        'user_id': user_obj['id'],
        'user_name': user_obj['user_name'],
        'role':user_obj['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=240)
    }
    
    # Generate the token
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    
    return token



@auth_bp.route('/login', methods=['POST'])
def loginAccount():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    print(username, role)

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE user_name = ? AND role= ?', (username,role)).fetchone()
    conn.close()

    print(user['password'])
    if user and check_password_hash(user['password'], password):
        jwt = create_jwt(user)
        return jsonify({"message": "Login successful!", "jwt":jwt}), 200
    
    return jsonify({"message": "Invalid credentials"}), 401