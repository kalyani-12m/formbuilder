import json
import os

FORMS_FILE = "data/forms.json"
RESPONSES_FILE = "data/responses.json"
USERS_FILE = "data/users.json"

# ---------- USERS ----------
def load_users():
    if not os.path.exists(USERS_FILE):
        return []
    with open(USERS_FILE, "r") as f:
        return json.load(f)

def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=4)


# ---------- FORMS ----------
def load_forms():
    if not os.path.exists(FORMS_FILE):
        return []
    with open(FORMS_FILE, "r") as f:
        return json.load(f)

def save_forms(forms):
    with open(FORMS_FILE, "w") as f:
        json.dump(forms, f, indent=4)


# ---------- RESPONSES ----------
def load_responses():
    if not os.path.exists(RESPONSES_FILE):
        return []
    with open(RESPONSES_FILE, "r") as f:
        return json.load(f)

def save_responses(responses):
    with open(RESPONSES_FILE, "w") as f:
        json.dump(responses, f, indent=4)