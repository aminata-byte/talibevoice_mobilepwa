function SelectField({ label, options, value, onChange, ...props }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select value={value} onChange={onChange} {...props}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
