import { useState } from "react";

function ToggleField({ label }) {
  const [isMajor, setIsMajor] = useState(false);

  return (
    <div className="toggle-field">
      <label>{label}</label>

      <div className="toggle-container">
        <button
          type="button"
          className={!isMajor ? "toggle-btn active" : "toggle-btn"}
          onClick={() => setIsMajor(false)}
        >
          Non
        </button>

        <button
          type="button"
          className={isMajor ? "toggle-btn active" : "toggle-btn"}
          onClick={() => setIsMajor(true)}
        >
          Oui
        </button>
      </div>
    </div>
  );
}

export default ToggleField;
