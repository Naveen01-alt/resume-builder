import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Experience.css";

export default function WorkExperience() {
  const navigate = useNavigate();

  // ✅ Load saved experiences from localStorage (if any)
  const [experiences, setExperiences] = useState(() => {
    const saved = localStorage.getItem("workList");
    return saved ? JSON.parse(saved) : [
      {
        jobTitle: "",
        employer: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ];
  });

  const [showPreview, setShowPreview] = useState(false);

  // ✅ Save to localStorage whenever experiences changes
  useEffect(() => {
    localStorage.setItem("workList", JSON.stringify(experiences));
  }, [experiences]);

  const handleChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        jobTitle: "",
        employer: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ]);
  };

  return (
    <section className="experience-section">
      <h2 className="section-title">Work Experience</h2>

      {experiences.map((exp, index) => (
        <div key={index} className="experience-card">
          <div className="form-grid">
            <input
              type="text"
              placeholder="Job Title"
              value={exp.jobTitle}
              onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
            />
            <input
              type="text"
              placeholder="Employer"
              value={exp.employer}
              onChange={(e) => handleChange(index, "employer", e.target.value)}
            />
          </div>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Location"
              value={exp.location}
              onChange={(e) => handleChange(index, "location", e.target.value)}
            />
            <input
              type="text"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => handleChange(index, "startDate", e.target.value)}
            />
            <input
              type="text"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => handleChange(index, "endDate", e.target.value)}
            />
          </div>
          <textarea
            rows="3"
            placeholder="Description of work (optional)"
            value={exp.description}
            onChange={(e) =>
              handleChange(index, "description", e.target.value)
            }
          />
        </div>
      ))}

      <div className="experience-buttons">
        <button className="add-btn" onClick={addExperience}>
          + Add More Experience
        </button>
      </div>

      <div className="nav-buttons">
        <button className="back-btn" onClick={() => navigate("/skills")}>
          Back
        </button>
        <button className="next-btn" onClick={() => navigate("/aboutme")}>
          Next
        </button>
        <button className="preview-btn" onClick={() => setShowPreview(true)}>
          Preview
        </button>
      </div>

      {showPreview && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="section-title">Experience Preview</h3>
            {experiences.map((exp, index) => (
              <div key={index} className="preview-card">
                <p><strong>Job Title:</strong> {exp.jobTitle}</p>
                <p><strong>Employer:</strong> {exp.employer}</p>
                <p><strong>Location:</strong> {exp.location}</p>
                <p><strong>Dates:</strong> {exp.startDate} – {exp.endDate}</p>
                <p><strong>Description:</strong> {exp.description}</p>
              </div>
            ))}
            <button className="close-btn" onClick={() => setShowPreview(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
