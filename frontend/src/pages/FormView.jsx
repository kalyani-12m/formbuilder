import { useEffect, useState } from "react";
import { submitResponse } from "../services/api";

export default function FormView({ id }) {
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/forms/")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id == id);
        setForm(found);
      });
  }, [id]);

  const handleChange = (fieldId, value) => {
    setResponses((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  // ✅ FIXED: NOW INSIDE COMPONENT
  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      formId: Number(id),
      answers: responses,
    };

    const res = await submitResponse(payload);

    setLoading(false);

    if (res.error) {
      alert(res.error);
    } else {
      alert("Response submitted successfully 🎉");
      console.log(res);
    }
  };

  if (!form) return <h3>Loading form...</h3>;

  return (
    <div className="form-view-container">

      <div className="form-header">
        <h1>{form.title}</h1>
        <p>Fill all required fields</p>
      </div>

      <div className="form-section">

        {form.fields?.map((field) => (
          <div key={field.id} className="question-block">

            <label className="question-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>

            {field.type === "text" && (
              <input
                placeholder={field.placeholder}
                onChange={(e) =>
                  handleChange(field.id, e.target.value)
                }
              />
            )}

            {field.type === "textarea" && (
              <textarea
                placeholder={field.placeholder}
                onChange={(e) =>
                  handleChange(field.id, e.target.value)
                }
              />
            )}

            {field.type === "radio" &&
              field.options.map((opt, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    name={field.id}
                    onChange={() =>
                      handleChange(field.id, opt)
                    }
                  />
                  {opt}
                </div>
              ))}

            {field.type === "checkbox" &&
              field.options.map((opt, i) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const prev = responses[field.id] || [];
                      const updated = e.target.checked
                        ? [...prev, opt]
                        : prev.filter((v) => v !== opt);

                      handleChange(field.id, updated);
                    }}
                  />
                  {opt}
                </div>
              ))}

            {field.type === "dropdown" && (
              <select
                onChange={(e) =>
                  handleChange(field.id, e.target.value)
                }
              >
                {field.options.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            )}

          </div>
        ))}

      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        {loading ? "Submitting..." : "Submit Response"}
      </button>

    </div>
  );
}