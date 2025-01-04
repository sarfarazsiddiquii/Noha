from pymongo import MongoClient

class Config:
    SECRET_KEY = "your_secret_key"
    MONGO_URI = "mongodb+srv://sarfaraz:gVEJAWpJYJceV60Q@cluster0.eacpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(MONGO_URI)
    db = client['user_auth']
    users_collection = db['users']
    meetings_collection = db['meetings']