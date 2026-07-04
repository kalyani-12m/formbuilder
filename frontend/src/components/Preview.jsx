function Preview({ fields }) {
  return (
    <div>
      {fields.length === 0 ? (
        <p>No preview available.</p>
      ) : (
        fields.map((field) => (
          <div key={field.id} style={{ marginBottom: "20px" }}>
            <label>{field.label}</label>

            <br />

            <input
              type="text"
              placeholder={field.placeholder}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px",
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Preview;