from flask import Blueprint, request, jsonify, session
from datetime import datetime
from config import Config

meetings_bp = Blueprint('meetings', __name__)

@meetings_bp.route('/create_meeting', methods=['POST'])
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
    Config.meetings_collection.insert_one({
        'username': session['username'],
        'title': title,
        'meeting_time': meeting_time
    })

    return jsonify({"message": "Meeting created successfully!"}), 201

@meetings_bp.route('/dashboard', methods=['GET'])
def dashboard():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized access"}), 401

    username = session['username']
    now = datetime.now()

    meetings = list(Config.meetings_collection.find(
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