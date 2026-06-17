import { useState } from "react";

function ToggleField({ label, value, onChange }) {
  return (
    <div className="toggle-field">
      <label>{label}</label>
      <div className="toggle-container">
        <button
          type="button"
          className={!value ? "toggle-btn active" : "toggle-btn"}
          onClick={() => onChange(false)}
        >
          Non
        </button>
        <button
          type="button"
          className={value ? "toggle-btn active" : "toggle-btn"}
          onClick={() => onChange(true)}
        >
          Oui
        </button>
      </div>
    </div>
  );
}

export default ToggleField;
