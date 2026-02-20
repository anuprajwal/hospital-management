from flask import Blueprint


pricing_management_bp = Blueprint('priceManagement', __name__)

print('price management blueprint loaded')


from backend.PricingManagement import pricingModule