from flask import Blueprint, request, jsonify
from auth import register_user, login_user

auth_bp = Blueprint("auth", __name__)

# REGISTER
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    user = register_user(data["username"], data["password"])

    if not user:
        return jsonify({"error": "User already exists"}), 400

    return jsonify({"message": "User registered", "user": user})


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    token = login_user(data["username"], data["password"])

    if not token:
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Login success", "token": token})