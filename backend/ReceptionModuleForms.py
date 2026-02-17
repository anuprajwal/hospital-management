import sqlite3
import json
from backend.db import get_db_connection

# Connection setup (assuming 'hospital.db')
conn = get_db_connection()
cursor = conn.cursor()

# 1. Fetch Users
cursor.execute("SELECT user_name FROM users WHERE status = 'Approve'")
user_rows = cursor.fetchall() # Get all rows once
user_list = [row[0] for row in user_rows] # Extract the first column (user_name)
print(f"Users found: {user_list}")

# 2. Fetch Specialities
cursor.execute("SELECT user_name FROM users WHERE role = 'Doctor' and status = 'Approve'")
doc_rows = cursor.fetchall() # Get all rows once
doc_list = [row[0] for row in doc_rows] # Extract the first column (speciality)
print(f"Specialities found: {doc_list}")

form_structure = [
    {"label": "Sur name", "type": "String", "required": True},
    {"label": "patient name", "type": "String", "required": True},
    {"label": "phone number", "type": "String", "required": False},
    {"label": "age", "type": "Int", "required": True},
    {"label": "gender", "type": "Dropdown", "options": ["Male", "Female", "Trans Gender"], "required": True},
    {"label": "appointment type", "type": "Dropdown", "options": ["Consultation", "Diagnosis", "Operation"], "required": False},
    {"label": "date", "type": "Date", "required": True},
    {"label": "time", "type": "Time", "required": True},
    {"label": "doctor", "type": "Dropdown", "options": doc_list, "required": False},
    {"label": "clinical description", "type": "Text", "required": False},
    {"label": "referer", "type": "Dropdown", "options": user_list, "required": False}
]

# Convert the Python list to a JSON string for SQLite
json_fields = json.dumps(form_structure)

try:
    conn.execute("""
        INSERT OR IGNORE INTO forms (module_id, form_name, form_fields, is_allowed)
        VALUES (
            (SELECT id FROM modules WHERE module_name = 'Reception'), 
            ?, 
            ?, 
            1
        )
    """, ("Out-Patient", json_fields))

    conn.commit()
    print("In-Patient form created successfully under the Reception module.")
    conn.close()

except sqlite3.IntegrityError as e:
    print(f"Error: Could not insert form. Ensure the 'Reception' module exists. Detail: {e}")