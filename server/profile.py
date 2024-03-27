from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data for demonstration purposes
profiles = {
    "example_user": {
        "email": "user@example.com"
    }
}

# View Profile Route
@app.route('/profile/view', methods=['GET'])
def view_profile():
    # Assuming authentication is handled and the username is available in the session or request
    username = "example_user"  # Example username, replace this with your authentication logic
    if username in profiles:
        profile_data = {
            "username": username,
            "email": profiles[username]["email"]
        }
        return jsonify(profile_data), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Delete Profile Route
@app.route('/profile/delete', methods=['DELETE'])
def delete_profile():
    username = request.args.get('username')
    confirm_delete = request.args.get('confirm_delete', type=bool)

    if not username or not confirm_delete:
        return jsonify({"error": "Username and confirm_delete parameters are required."}), 400

    if username in profiles and confirm_delete:
        del profiles[username]
        return jsonify({"message": "Profile deleted successfully."}), 200
    else:
        return jsonify({"error": "User not found or delete confirmation not provided."}), 404

# Leaderboard Route
@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    # Sample leaderboard data for demonstration purposes
    leaderboard_data = [
        {"rank": 1, "username": "user1", "points": 100},
        {"rank": 2, "username": "user2", "points": 90},
        {"rank": 3, "username": "user3", "points": 80},
        # Add more leaderboard entries as needed
    ]
    return jsonify({"leaderboard": leaderboard_data}), 200

if __name__ == '__main__':
    app.run(debug=True)
