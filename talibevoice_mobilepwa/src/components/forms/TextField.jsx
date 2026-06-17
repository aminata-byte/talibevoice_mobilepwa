function TextField({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextField;
