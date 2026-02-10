from flask import Blueprint


auth_bp = Blueprint('auth', __name__)

print('auth blueprint loaded')


from backend.auth import createAccount, login, createSuperAdmin