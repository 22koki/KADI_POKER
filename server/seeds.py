from app import app  # Import the Flask app object
from models import db, GameRecord  # Import the database object and GameRecord model from models

# Using the app's context to perform database operations
with app.app_context():

#Delete all existing records in the GameRecord table
    GameRecord.query.delete()

     # Define a list of GameRecord objects to be added to the database
    game_records = [
        GameRecord(game_id="1", user_id="1", result="0"),
        GameRecord(game_id="2", user_id="1", result="1"),
        GameRecord(game_id="3", user_id="2", result="0"),
        GameRecord(game_id="4", user_id="3", result="1"),
        GameRecord(game_id="5", user_id="3", result="1"),
        GameRecord(game_id="6", user_id="3", result="0"),
        GameRecord(game_id="7", user_id="4", result="0"),
        GameRecord(game_id="8", user_id="4", result="1"),
        GameRecord(game_id="9", user_id="6", result="1"),
        GameRecord(game_id="10", user_id="5", result="1"),
        GameRecord(game_id="11", user_id="5", result="0"),
    ]
 
 # Bulk save the new game records to the database for efficiency
    db.session.bulk_save_objects(game_records)

     # Commit the changes to the database
    db.session.commit()