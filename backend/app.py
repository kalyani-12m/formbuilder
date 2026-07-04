from flask import Flask
from flask_cors import CORS

from routes.auth_routes import auth_bp
from routes.form_routes import form_bp
from routes.response_routes import response_bp

app = Flask(__name__)
CORS(app)

# register routes
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(form_bp, url_prefix="/api/forms")
app.register_blueprint(response_bp, url_prefix="/api/responses")

@app.route("/")
def home():
    return {"message": "Form Builder API Running"}

if __name__ == "__main__":
    app.run(debug=True)