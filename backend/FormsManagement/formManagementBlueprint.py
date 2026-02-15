from flask import Blueprint


module_management_bp = Blueprint('moduleManagement', __name__)

print('module management blueprint loaded')


from backend.FormsManagement import saveForms, deleteForms, deleteModule, addModule, enableDisableModule, getModules, getForms, editModuleDescription, getPersonalisedForms