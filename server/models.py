from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

# Initialize SQLAlchemy - this is the core part of the ORM that will be used for database interactions.
db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    # Define a table name for the User model
    __tablename__ = 'users'

     # Define columns for the User model
    user_id = db.Column(db.Integer, primary_key=True)  # User's unique ID
    username = db.Column(db.String(50), unique=True, nullable=False)  # Username, must be unique
    password_hash = db.Column(db.String(128), nullable=False)  # Hash of the user's password
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)  # Timestamp of user creation

      # Establish a relationship with the GameRecord model
    # This indicates that a user can have multiple game records
    games = db.relationship('GameRecord', backref='users', lazy=True)

class GameRecord(db.Model, SerializerMixin):
    # Define a table name for the GameRecord model
    __tablename__ = 'game_records'  # Corrected from '_tablename_'

    # Define columns for the GameRecord model
    game_id = db.Column(db.Integer, primary_key=True)  # Game's unique ID
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)  # ID of the user, foreign key to users table
    result = db.Column(db.Integer, nullable=False)  # Result of the game
    timestamp = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)  # Timestamp of the game

    def to_dict(self): 
        # Convert the GameRecord object into a dictionary for easier access and manipulation
        return {
            'game_id': self.game_id,
            'user_id': self.user_id,
            'result': self.result,
            'timestamp': self.timestamp
            # Additional fields can be added here as needed
        }
