import sqlite3
from werkzeug.security import generate_password_hash
import os
from dotenv import load_dotenv


load_dotenv()


super_admin_password = generate_password_hash(os.getenv('SUPER_ADMIN_PASS'))

ACCEPTABLE_MODULES = ['Laboratory','Reception','Doctor', 'Out-Patient', 'Pharmacy', 'In-Patient', 'Billing']

DB_NAME = "project_data.db"

def initialize_database():
    """
    Creates the .db file if it doesn't exist and 
    sets up the table structure safely.
    """
    connection = sqlite3.connect(DB_NAME)
    cursor = connection.cursor()

    # The 'IF NOT EXISTS' clause makes this script safe to run repeatedly
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_name TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('Super_Admin', 'Receptionist', 'Lab_Incharge', 'Admin', 'Doctor')),
            status TEXT NOT NULL CHECK(status IN ('Approve', 'Frozen')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
    INSERT OR IGNORE INTO users (user_name, password, role, status)
    VALUES (?, ?, ?, ?)
""", ('admin', super_admin_password, 'Super_Admin', 'Approve'))

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS forms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            module_id INTEGER NOT NULL,
            form_name TEXT UNIQUE NOT NULL,
            form_fields TEXT NOT NULL,
            is_allowed INTEGER DEFAULT 1 CHECK(is_allowed IN (0, 1)),
            created_on DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (module_id) REFERENCES modules (id) ON DELETE RESTRICT
        )
    """)


    cursor.execute("""
        CREATE TABLE IF NOT EXISTS data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            form_id INTEGER NOT NULL,
            form_data TEXT NOT NULL,
            created_on DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (form_id) REFERENCES forms (id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS outPatient (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            patient_name TEXT NOT NULL,
            form_data TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Created' CHECK(status IN ('Created', 'Visiting', 'Deleted', 'Discharged')),
            created_on DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS inPatient (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_name TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            form_data TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Created' CHECK(status IN ('Created', 'Visiting', 'Deleted', 'Discharged')),
            created_on DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS modules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            is_allowed INTEGER NOT NULL DEFAULT 0 CHECK (is_allowed IN (0,1)),
            module_name TEXT UNIQUE NOT NULL CHECK (module_name IN ('Laboratory','Reception','Doctor', 'Out-Patient', 'Pharmacy', 'In-Patient', 'Billing')),
            description TEXT CHECK (length(description) <= 200),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS doctor_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL UNIQUE,
        licence_number TEXT NOT NULL UNIQUE,        
        documents TEXT, 
        phone_number TEXT NOT NULL,
        created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
""")

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS specialities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            speciality TEXT UNIQUE NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER NOT NULL,
            lab_technician_id INTEGER,
            test_name TEXT NOT NULL,
            test_cost REAL NOT NULL DEFAULT 0.0,
            test_results TEXT,
            status TEXT NOT NULL CHECK(status IN ('recommended', 'payment done', 'cancelled', 'test processing', 'test completed')),
            created_on DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (patient_id) REFERENCES outPatient(id) ON DELETE CASCADE,
            FOREIGN KEY (lab_technician_id) REFERENCES users(id)
        );
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS prescriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER NOT NULL,
            doctor_id INTEGER NOT NULL,
            prescription TEXT NOT NULL,
            created_on DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (patient_id) REFERENCES outPatient(id) ON DELETE CASCADE,
            FOREIGN KEY (doctor_id) REFERENCES users(id)
        );
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS pricing (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            status INTEGER NOT NULL CHECK(status IN (0, 1)), 
            price REAL NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    """)

    for module in ACCEPTABLE_MODULES:
        cursor.execute("INSERT OR IGNORE INTO modules (module_name) VALUES (?)", (module,))


    connection.commit()
    connection.close()
    print(f"[*] Database '{DB_NAME}' is ready (verified/created).")
    import backend.ReceptionModuleForms

def get_db_connection():
    """Helper to get a connection for routes to use."""
    conn = sqlite3.connect(DB_NAME)
    conn.execute("PRAGMA foreign_keys = ON")
    conn.row_factory = sqlite3.Row
    return conn