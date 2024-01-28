from app import app  # Import the Flask app object
from models import db, GameRecord  # Import the database object and GameRecord model from models

# Using the app's context to perform database operations
with app.app_context():
