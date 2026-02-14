import sqlite3
import os

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
            user_name TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('Super_Admin', 'Receptionist', 'Lab_Incharge')),
            status TEXT NOT NULL CHECK(status IN ('Approve', 'Frozen')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS forms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            module_id INTEGER NOT NULL,
            form_name TEXT NOT NULL,
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
    CREATE TABLE IF NOT EXISTS modules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        is_allowed INTEGER NOT NULL DEFAULT 0 CHECK (is_allowed IN (0,1)),
        module_name TEXT UNIQUE NOT NULL CHECK (module_name IN ('Laboratory','Reception','Doctor', 'Out-Patient', 'Pharmacy', 'In-Patient', 'Billing')),
        description TEXT CHECK (length(description) <= 200),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
""")


    connection.commit()
    connection.close()
    print(f"[*] Database '{DB_NAME}' is ready (verified/created).")

def get_db_connection():
    """Helper to get a connection for routes to use."""
    conn = sqlite3.connect(DB_NAME)
    conn.execute("PRAGMA foreign_keys = ON")
    conn.row_factory = sqlite3.Row
    return conn