from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, GameRecord
from game_logic import PokerGame
from flask import abort


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Adjust the origin as needed
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///poker_records.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
migrate = Migrate(app, db)
db.init_app(app)

# Create tables based on the defined models
with app.app_context():
    db.create_all()

poker_game = PokerGame()

# Index Route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Poker API!"})

# Route to return the deck of cards
@app.route("/deck", methods=["GET"])
def get_deck():
    # Initialize the deck before the game starts
    poker_game.initialize_deck()
    poker_game.deck = poker_game.get_shuffled_deck()
    return jsonify({"deck": poker_game.deck})