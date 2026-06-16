function SelectField({ label, options }) {
  return (
    <div className="field">
      <label>{label}</label>

      <select>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
