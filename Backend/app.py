from flask import Flask
from flask_cors import CORS
from config import Config
from routes.auth import auth_bp
from routes.meetings import meetings_bp

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"]) 
app.secret_key = Config.SECRET_KEY

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(meetings_bp)

if __name__ == '__main__':
    app.run(debug=True)