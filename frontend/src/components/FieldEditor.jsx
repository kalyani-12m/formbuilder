function FieldEditor({ field, updateField, deleteField }) {
  const updateOption = (index, value) => {
    const updatedOptions = [...field.options];
    updatedOptions[index] = value;
    updateField(field.id, "options", updatedOptions);
  };

  const addOption = () => {
    updateField(field.id, "options", [...field.options, "New Option"]);
  };

  const deleteOption = (index) => {
    const updatedOptions = field.options.filter((_, i) => i !== index);
    updateField(field.id, "options", updatedOptions);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "20px",
        background: "#fafafa",
      }}
    >
      <h3>{field.type.toUpperCase()}</h3>

      <label>Question Label</label>

      <input
        type="text"
        value={field.label}
        onChange={(e) => updateField(field.id, "label", e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "5px",
          marginBottom: "15px",
        }}
      />

      {(field.type === "text" || field.type === "textarea") && (
        <>
          <label>Placeholder</label>

          <input
            type="text"
            value={field.placeholder}
            onChange={(e) =>
              updateField(field.id, "placeholder", e.target.value)
            }
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "15px",
            }}
          />
        </>
      )}

      {(field.type === "radio" ||
        field.type === "checkbox" ||
        field.type === "dropdown") && (
        <>
          <label>Options</label>

          {field.options.map((option, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                style={{
                  flex: 1,
                  padding: "8px",
                }}
              />

              <button
                onClick={() => deleteOption(index)}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={addOption}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            Add Option
          </button>
        </>
      )}

      <div style={{ marginBottom: "15px" }}>
        <label>
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) =>
              updateField(field.id, "required", e.target.checked)
            }
          />{" "}
          Required Field
        </label>
      </div>

      <button
        onClick={() => deleteField(field.id)}
        style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete Field
      </button>
    </div>
  );
}

export default FieldEditor;