function TextField({ label, type = "text", placeholder }) {
  return (
    <div className="field">
      <label>{label}</label>

      <input type={type} placeholder={placeholder} />
    </div>
  );
}

export default TextField;
