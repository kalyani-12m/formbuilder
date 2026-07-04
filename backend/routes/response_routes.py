from flask import Blueprint, request, jsonify

response_bp = Blueprint("responses", __name__)

# temporary storage (use DB later)
responses = []

# SUBMIT RESPONSE
@response_bp.route("/", methods=["POST"])
def submit_response():
    data = request.json

    response = {
        "id": len(responses) + 1,
        "formId": data.get("formId"),
        "answers": data.get("answers")
    }

    responses.append(response)

    return jsonify({
        "message": "Response submitted successfully",
        "response": response
    })

# GET RESPONSES FOR A FORM
@response_bp.route("/<int:form_id>", methods=["GET"])
def get_responses(form_id):
    form_responses = [
        r for r in responses if r["formId"] == form_id
    ]

    return jsonify(form_responses)