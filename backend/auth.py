import uuid
from models import users, sessions

# REGISTER USER
def register_user(username, password):
    for u in users:
        if u["username"] == username:
            return None

    user = {
        "id": len(users) + 1,
        "username": username,
        "password": password
    }

    users.append(user)
    return user


# LOGIN USER
def login_user(username, password):
    for u in users:
        if u["username"] == username and u["password"] == password:
            token = str(uuid.uuid4())
            sessions[token] = u["id"]
            return token

    return None


# GET USER FROM TOKEN
def get_user(token):
    user_id = sessions.get(token)
    if not user_id:
        return None

    return next((u for u in users if u["id"] == user_id), None)