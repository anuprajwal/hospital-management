from flask import Flask
from flask_cors import CORS
from backend.db import initialize_database
from dotenv import load_dotenv
import os
from backend.auth.authBlueprint import auth_bp

load_dotenv()

app = Flask(__name__)
CORS(app) # Open to all traffic

app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')

# --- Startup Logic ---
# This runs every time the server starts or restarts
initialize_database()

app.register_blueprint(auth_bp, url_prefix='/auth')

print(app.url_map)


if __name__ == '__main__':
    app.run(debug=True, port=5000)