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
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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