from flask import Blueprint, request, jsonify
from utils.storage import load_users, save_users

auth_bp = Blueprint("auth", __name__)

# REGISTER
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    users = load_users()

    # check existing email
    existing = next(
        (u for u in users if u["email"] == data.get("email")),
        None
    )

    if existing:
        return jsonify({"error": "Email already exists"}), 400

    user = {
        "id": len(users) + 1,
        "email": data.get("email"),
        "password": data.get("password")  # simple version
    }

    users.append(user)
    save_users(users)

    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": user["id"],
            "email": user["email"]
        }
    })


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    users = load_users()

    user = next(
        (u for u in users if u["email"] == data.get("email")
         and u["password"] == data.get("password")),
        None
    )

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "email": user["email"]
        }
    })