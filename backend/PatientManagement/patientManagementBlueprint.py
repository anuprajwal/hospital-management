from flask import Blueprint


patient_management_bp = Blueprint('patientManagement', __name__)

print('Patient management blueprint loaded')


from backend.PatientManagement.outPatientModule import get_outpatients, create_outpatient