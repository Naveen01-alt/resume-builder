export default function TemplateCard({ template }) {
  if (!template) return null; // safeguard

  return (
    <div className="template-card">
      <img src={template.image} alt={template.name} className="template-image" />
      <div className="template-info">
        <h3>{template.name}</h3>
        <div className="template-actions">
          <button className="btn preview">Preview</button>
          <button className="btn select">Choose</button>
        </div>
      </div>
    </div>
  );
}
