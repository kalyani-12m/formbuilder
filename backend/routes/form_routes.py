from flask import Blueprint, request, jsonify
from utils.storage import load_forms, save_forms

form_bp = Blueprint("forms", __name__)

# CREATE FORM
@form_bp.route("/", methods=["POST"])
def create_form():
    data = request.json

    forms = load_forms()

    form = {
        "id": len(forms) + 1,
        "title": data.get("title"),
        "fields": data.get("fields")
    }

    forms.append(form)
    save_forms(forms)

    return jsonify(form)

# GET ALL FORMS
@form_bp.route("/", methods=["GET"])
def get_forms():
    return jsonify(load_forms())

# GET SINGLE FORM
@form_bp.route("/<int:form_id>", methods=["GET"])
def get_form(form_id):
    forms = load_forms()

    form = next((f for f in forms if f["id"] == form_id), None)

    if not form:
        return jsonify({"error": "Form not found"}), 404

    return jsonify(form)