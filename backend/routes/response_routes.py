from flask import Blueprint, request, jsonify
from utils.storage import load_responses, save_responses

response_bp = Blueprint("responses", __name__)

# SUBMIT RESPONSE
@response_bp.route("/", methods=["POST"])
def submit_response():
    data = request.json

    responses = load_responses()

    response = {
        "id": len(responses) + 1,
        "formId": data.get("formId"),
        "answers": data.get("answers")
    }

    responses.append(response)
    save_responses(responses)

    return jsonify({
        "message": "Response submitted successfully",
        "response": response
    })

# GET RESPONSES FOR FORM
@response_bp.route("/<int:form_id>", methods=["GET"])
def get_responses(form_id):
    responses = load_responses()

    form_responses = [
        r for r in responses if r["formId"] == form_id
    ]

    return jsonify(form_responses)