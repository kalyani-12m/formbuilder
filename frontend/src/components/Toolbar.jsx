function Toolbar({ createField }) {
  return (
    <div className="toolbar">

      <button
        onClick={() => createField("text")}
      >
        + Text Input
      </button>

      <button
        onClick={() => createField("textarea")}
      >
        + Textarea
      </button>

      <button
        onClick={() => createField("radio")}
      >
        + Radio Button
      </button>

      <button
        onClick={() => createField("checkbox")}
      >
        + Checkbox
      </button>

      <button
        onClick={() => createField("dropdown")}
      >
        + Dropdown
      </button>

    </div>
  );
}

export default Toolbar;