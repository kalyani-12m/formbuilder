from flask import Blueprint, request, jsonify
from models import forms

form_bp = Blueprint("forms", __name__)

# CREATE FORM (NO AUTH FOR NOW)
@form_bp.route("/", methods=["POST"])
def create_form():
    data = request.json

    form = {
        "id": len(forms) + 1,
        "title": data.get("title"),
        "fields": data.get("fields")
    }

    forms.append(form)
    return jsonify(form)

# GET ALL FORMS
@form_bp.route("/", methods=["GET"])
def get_forms():
    return jsonify(forms)

# GET SINGLE FORM
@form_bp.route("/<int:form_id>", methods=["GET"])
def get_form(form_id):
    form = next((f for f in forms if f["id"] == form_id), None)

    if not form:
        return jsonify({"error": "Form not found"}), 404

    return jsonify(form)