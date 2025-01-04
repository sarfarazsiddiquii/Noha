from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required
from config import Config
from routes.auth import auth_bp
from routes.meetings import meetings_bp

app = Flask(__name__)

# Configure CORS to allow requests from the frontend
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# Set the secret key for JWT
app.config['JWT_SECRET_KEY'] = Config.SECRET_KEY
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(meetings_bp)

# Test JWT endpoint (Optional)
@app.route('/test', methods=['GET'])
@jwt_required()
def test_jwt():
    return {"message": "JWT is working!"}, 200

if __name__ == '__main__':
    app.run(debug=True)
