import { useState } from "react";
import Toolbar from "../components/Toolbar";
import { createForm } from "../services/api";
import "../styles/builder.css";

function Home() {
  const [fields, setFields] = useState([]);
  const [savedForm, setSavedForm] = useState(null);

  // Create a new field
  const createField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: `Question ${fields.length + 1}`,
      placeholder: "Enter your answer",
      required: false,
      options:
        ["radio", "checkbox", "dropdown"].includes(type)
          ? ["Option 1", "Option 2"]
          : [],
    };

    setFields((prev) => [...prev, newField]);
  };

  // Update field
  const updateField = (id, key, value) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  // Delete field
  const deleteField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  // ⭐ SAVE FORM TO BACKEND (NEW)
  const saveForm = async () => {
    const formData = {
      title: "My Form",
      fields,
    };

    try {
      const res = await createForm(formData);

      setSavedForm(res);

      alert("Form Created Successfully 🎉");

      console.log("Form Saved:", res);
      console.log(`Share Link: http://localhost:5173/form/${res.id}`);
    } catch (err) {
      alert("Error saving form");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Multi-Step Quiz / Form Builder</h1>

      <div className="layout">

        {/* LEFT PANEL */}
        <div className="left-panel">

          <Toolbar createField={createField} />

          <div className="builder">
            <h2>Form Builder</h2>

            {fields.length === 0 ? (
              <p>No fields added.</p>
            ) : (
              fields.map((field) => (
                <div key={field.id} className="field-card">

                  {/* QUESTION */}
                  <label>Question</label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) =>
                      updateField(field.id, "label", e.target.value)
                    }
                  />

                  {/* PLACEHOLDER */}
                  {(field.type === "text" ||
                    field.type === "textarea") && (
                    <>
                      <label>Placeholder</label>
                      <input
                        type="text"
                        value={field.placeholder}
                        onChange={(e) =>
                          updateField(
                            field.id,
                            "placeholder",
                            e.target.value
                          )
                        }
                      />
                    </>
                  )}

                  {/* OPTIONS */}
                  {["radio", "checkbox", "dropdown"].includes(
                    field.type
                  ) && (
                    <>
                      <h4>Options</h4>

                      {field.options.map((option, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "8px",
                          }}
                        >
                          <input
                            value={option}
                            onChange={(e) => {
                              const updated = [...field.options];
                              updated[index] = e.target.value;
                              updateField(field.id, "options", updated);
                            }}
                          />

                          <button
                            onClick={() => {
                              const updated = field.options.filter(
                                (_, i) => i !== index
                              );
                              updateField(field.id, "options", updated);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() =>
                          updateField(field.id, "options", [
                            ...field.options,
                            `Option ${field.options.length + 1}`,
                          ])
                        }
                      >
                        + Add Option
                      </button>
                    </>
                  )}

                  {/* REQUIRED */}
                  <label>
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        updateField(
                          field.id,
                          "required",
                          e.target.checked
                        )
                      }
                    />
                    Required
                  </label>

                  {/* DELETE */}
                  <button onClick={() => deleteField(field.id)}>
                    Delete Field
                  </button>
                </div>
              ))
            )}

            {/* ⭐ SAVE BUTTON */}
            <button
              onClick={saveForm}
              style={{
                marginTop: "20px",
                background: "#16a34a",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Create Form
            </button>

            {/* ⭐ SUCCESS UI */}
            {savedForm && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  background: "#dcfce7",
                  borderRadius: "8px",
                }}
              >
                <h3>Form Created 🎉</h3>
                <p>
                  Form ID: <b>{savedForm.id}</b>
                </p>
                <p>
                  Share Link:{" "}
                  <a href={`/form/${savedForm.id}`}>
                    Open Form
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <h2>Live Preview</h2>

          {fields.length === 0 ? (
            <p>No Preview</p>
          ) : (
            fields.map((field) => (
              <div key={field.id} className="preview-card">
                <label>
                  {field.label}
                  {field.required && (
                    <span style={{ color: "red" }}> *</span>
                  )}
                </label>

                {field.type === "text" && (
                  <input placeholder={field.placeholder} />
                )}

                {field.type === "textarea" && (
                  <textarea placeholder={field.placeholder} />
                )}

                {field.type === "radio" &&
                  field.options.map((opt, i) => (
                    <div key={i}>
                      <input type="radio" name={field.id} />
                      {opt}
                    </div>
                  ))}

                {field.type === "checkbox" &&
                  field.options.map((opt, i) => (
                    <div key={i}>
                      <input type="checkbox" />
                      {opt}
                    </div>
                  ))}

                {field.type === "dropdown" && (
                  <select>
                    {field.options.map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;