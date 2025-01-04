from pymongo import MongoClient

class Config:
    SECRET_KEY = "your_secret_key"
    MONGO_URI = "your_mongo_uri"
    client = MongoClient(MONGO_URI)
    db = client['user_auth']
    users_collection = db['users']
    meetings_collection = db['meetings']