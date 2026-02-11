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
            form_name TEXT NOT NULL,
            form_fields TEXT NOT NULL,
            is_allowed INTEGER DEFAULT 1 CHECK(is_allowed IN (0, 1)),
            created_on DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)


    cursor.execute("""
        CREATE TABLE IF NOT EXISTS data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL, -- Reference to users table ID
            form_id INTEGER NOT NULL, -- Foreign Key
            form_data TEXT NOT NULL,  -- String for JSON
            created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (form_id) REFERENCES forms (id)
        )
    """)

    connection.commit()
    connection.close()
    print(f"[*] Database '{DB_NAME}' is ready (verified/created).")

def get_db_connection():
    """Helper to get a connection for routes to use."""
    conn = sqlite3.connect(DB_NAME)
    # This allows us to access columns by name like row['item_name'] 
    # instead of just index row[1]
    conn.row_factory = sqlite3.Row
    return conn