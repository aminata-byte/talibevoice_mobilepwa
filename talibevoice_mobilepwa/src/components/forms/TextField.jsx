function TextField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  ...props
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default TextField;
