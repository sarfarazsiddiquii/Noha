from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    existing_user = Config.users_collection.find_one({'username': username})
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    hash_password = generate_password_hash(password)
    Config.users_collection.insert_one({'username': username, 'password': hash_password})
    return jsonify({"message": "Signup successful!"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = Config.users_collection.find_one({'username': username})
    if user and check_password_hash(user['password'], password):
        session.permanent = True
        session['username'] = username
        return jsonify({
            "message": f"Welcome {username}!",
            "username": username
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    if 'username' in session:
        session.pop('username')
        return jsonify({"message": "Logged out successfully!"}), 200
    return jsonify({"error": "You are not logged in"}), 400