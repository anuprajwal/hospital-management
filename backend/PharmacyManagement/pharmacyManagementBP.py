from flask import Blueprint


pharmacy_management_bp = Blueprint('pharmacyManagement', __name__)

print('Pharmacy management blueprint loaded')


from backend.PharmacyManagement import pharmacy