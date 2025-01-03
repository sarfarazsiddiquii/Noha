from flask import Flask, request, jsonify, session
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])  # Add your frontend's origin here
app.secret_key = "your_secret_key"

# MongoDB Configuration
MONGO_URI = "mongodb+srv://sarfaraz:gVEJAWpJYJceV60Q@cluster0.eacpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client['user_auth']  # Database name
users_collection = db['users']  # Collection for users
meetings_collection = db['meetings']  # Collection for meetings

@app.route('/')
def home():
    if 'username' in session:
        return jsonify({"message": f"Welcome {session['username']}!"}), 200
    return jsonify({"message": "Please log in."}), 200


@app.route('/create_meeting', methods=['POST'])
def create_meeting():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized access"}), 401

    data = request.json
    title = data.get('title')
    meeting_time = data.get('meeting_time')  # Expected format: "YYYY-MM-DD HH:MM:SS"

    if not title or not meeting_time:
        return jsonify({"error": "Title and meeting time are required"}), 400

    try:
        meeting_time = datetime.strptime(meeting_time, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        return jsonify({"error": "Invalid meeting time format. Use 'YYYY-MM-DD HH:MM:SS'"}), 400

    # Insert the meeting into the collection
    meetings_collection.insert_one({
        'username': session['username'],
        'title': title,
        'meeting_time': meeting_time
    })

    return jsonify({"message": "Meeting created successfully!"}), 201

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    existing_user = users_collection.find_one({'username': username})
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    hash_password = generate_password_hash(password)
    users_collection.insert_one({'username': username, 'password': hash_password})
    return jsonify({"message": "Signup successful!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = users_collection.find_one({'username': username})
    if user and check_password_hash(user['password'], password):
        session.permanent = True
        session['username'] = username
        return jsonify({
            "message": f"Welcome {username}!",
            "username": username
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/dashboard', methods=['GET'])
def dashboard():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized access"}), 401

    username = session['username']
    now = datetime.now()

    meetings = list(meetings_collection.find(
        {'username': username, 'meeting_time': {'$gte': now}}
    ))

    return jsonify({
        "username": username,
        "meetings": [{
            "id": str(meeting["_id"]),
            "title": meeting["title"],
            "time": meeting["meeting_time"].strftime("%Y-%m-%d %H:%M:%S")
        } for meeting in meetings]
    }), 200



@app.route('/logout', methods=['POST'])
def logout():
    if 'username' in session:
        session.pop('username')
        return jsonify({"message": "Logged out successfully!"}), 200
    return jsonify({"error": "You are not logged in"}), 400

if __name__ == '__main__':
    app.run(debug=True)