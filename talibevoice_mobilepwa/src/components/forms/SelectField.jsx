function SelectField({ label, options, value, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
