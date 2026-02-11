from flask import Blueprint


user_management_bp = Blueprint('userManagement', __name__)

print('user management blueprint loaded')


from backend.UsersManagement import getAllUsers, changeUserStatus, deleteAccount