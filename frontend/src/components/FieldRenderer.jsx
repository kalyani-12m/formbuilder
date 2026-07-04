function FieldRenderer({ field }) {
  switch (field.type) {
    case "text":
      return (
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            {field.label}
            {field.required && (
              <span style={{ color: "red", marginLeft: "4px" }}>*</span>
            )}
          </label>

          <input
            type="text"
            placeholder={field.placeholder}
            required={field.required}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
        </div>
      );

    case "textarea":
      return (
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            {field.label}
            {field.required && (
              <span style={{ color: "red", marginLeft: "4px" }}>*</span>
            )}
          </label>

          <textarea
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              resize: "vertical",
            }}
          />
        </div>
      );

    case "radio":
      return (
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            {field.label}
            {field.required && (
              <span style={{ color: "red", marginLeft: "4px" }}>*</span>
            )}
          </label>

          {field.options.map((option, index) => (
            <div key={index} style={{ marginBottom: "6px" }}>
              <label>
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  required={field.required}
                  style={{ marginRight: "8px" }}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            {field.label}
            {field.required && (
              <span style={{ color: "red", marginLeft: "4px" }}>*</span>
            )}
          </label>

          {field.options.map((option, index) => (
            <div key={index} style={{ marginBottom: "6px" }}>
              <label>
                <input
                  type="checkbox"
                  value={option}
                  style={{ marginRight: "8px" }}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      );

    case "dropdown":
      return (
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            {field.label}
            {field.required && (
              <span style={{ color: "red", marginLeft: "4px" }}>*</span>
            )}
          </label>

          <select
            required={field.required}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <option value="">Select an option</option>

            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );

    default:
      return null;
  }
}

export default FieldRenderer;