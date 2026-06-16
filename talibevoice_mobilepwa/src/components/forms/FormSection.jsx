function FormSection({ icon, title, children }) {
  return (
    <div className="form-section">
      <div className="form-section__header">
        <span>{icon}</span>
        <h3>{title}</h3>
      </div>

      <div className="form-section__content">{children}</div>
    </div>
  );
}

export default FormSection;
