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

@app.route("/shuffle", methods=["POST"])
def shuffle_deck():
    poker_game.deck = poker_game.get_shuffled_deck()
    return jsonify({"message": "Deck shuffled successfully", "shuffled_deck": poker_game.deck})

# Route to draw one card from the deck
@app.route("/draw", methods=["GET"])
def draw_card():
    if not poker_game.deck:
        return jsonify({"message": "No cards left in the deck"})

    card = poker_game.deck.pop(0)
    poker_game.generate_pc_move() # if card is picked initialize pc to make its own next move
    return jsonify({"card": card})

# Endpoint for User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if the username already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    # Update this line in your register route
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')


    new_user = User(username=username, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Endpoint for User Authentication
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
# Endpoint for User records
@app.route('/gameRecord')
def get_gameRecords():
    scores = GameRecord.query.all()
    serialized_scores = [score.to_dict() for score in scores]

    return jsonify({"scores": serialized_scores})

# Endpoint to record Game Results, associating it with the user who played the game
@app.route('/record_game', methods=['POST'])
def record_game():
    data = request.get_json()
    user_id = data.get('user_id')  # Assuming you have a way to get the user ID
    result = data.get('result')

    new_game_record = GameRecord(user_id=user_id, result=result)
    db.session.add(new_game_record)
    db.session.commit()

    return jsonify({"message": "Game result recorded successfully"}), 201    
    