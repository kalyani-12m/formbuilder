function Builder({ fields, updateField, deleteField }) {
  if (fields.length === 0) {
    return <p style={{ marginTop: "20px" }}>No fields added yet.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {fields.map((field) => (
        <div
          key={field.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            background: "#fafafa",
          }}
        >
          <label>Question Label</label>

          <input
            type="text"
            value={field.label}
            onChange={(e) =>
              updateField(field.id, "label", e.target.value)
            }
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "15px",
            }}
          />

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

          <button
            onClick={() => deleteField(field.id)}
            style={{
              marginTop: "10px",
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
      ))}
    </div>
  );
}

export default Builder;