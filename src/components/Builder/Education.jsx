import { useState, useEffect } from "react";
import "./Education.css";
import { useNavigate } from "react-router-dom";

export default function Education() {
  const navigate = useNavigate();

  // ✅ Load saved data from localStorage (if any)
  const [educationList, setEducationList] = useState(() => {
    const saved = localStorage.getItem("educationList");
    return saved ? JSON.parse(saved) : [
      {
        degree: "",
        field: "",
        school: "",
        location: "",
        start: "",
        end: "",
        description: ""
      }
    ];
  });

  const [showPreview, setShowPreview] = useState(false);

  // ✅ Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("educationList", JSON.stringify(educationList));
  }, [educationList]);

  const handleChange = (index, field, value) => {
    const newList = [...educationList];
    newList[index][field] = value;
    setEducationList(newList);
  };

  const addMore = () => {
    setEducationList([
      ...educationList,
      {
        degree: "",
        field: "",
        school: "",
        location: "",
        start: "",
        end: "",
        description: ""
      }
    ]);
  };

  return (
    <section className="education-section">
      <h2 className="section-title">Education Details</h2>

      {educationList.map((edu, index) => (
        <div key={index} className="education-card">
          <div className="form-grid">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
            />
            <input
              type="text"
              placeholder="Field of Study"
              value={edu.field}
              onChange={(e) => handleChange(index, "field", e.target.value)}
            />
          </div>
          <div className="form-grid">
            <input
              type="text"
              placeholder="School / College"
              value={edu.school}
              onChange={(e) => handleChange(index, "school", e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={edu.location}
              onChange={(e) => handleChange(index, "location", e.target.value)}
            />
          </div>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Start Year"
              value={edu.start}
              onChange={(e) => handleChange(index, "start", e.target.value)}
            />
            <input
              type="text"
              placeholder="End Year"
              value={edu.end}
              onChange={(e) => handleChange(index, "end", e.target.value)}
            />
          </div>
          <textarea
            rows="3"
            placeholder="Description (optional)"
            value={edu.description}
            onChange={(e) =>
              handleChange(index, "description", e.target.value)
            }
          />
        </div>
      ))}

      <div className="education-buttons">
        <button className="add-more-btn" onClick={addMore}>
          + Add More Education
        </button>
      </div>

      <div className="nav-buttons">
        <button className="back-btn" onClick={() => navigate("/personalinfo")}>
          Back
        </button>
        <button className="next-btn" onClick={() => navigate("/skills")}>
          Next
        </button>
        <button className="next-btn" onClick={() => setShowPreview(true)}>
          Preview
        </button>
      </div>

      {/* ✅ Preview Modal */}
      {showPreview && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="section-title">Education Preview</h3>
            {educationList.map((edu, index) => (
              <div key={index} className="education-card">
                <p><strong>Degree:</strong> {edu.degree}</p>
                <p><strong>Field of Study:</strong> {edu.field}</p>
                <p><strong>School:</strong> {edu.school}</p>
                <p><strong>Location:</strong> {edu.location}</p>
                <p><strong>Years:</strong> {edu.start} - {edu.end}</p>
                <p><strong>Description:</strong> {edu.description}</p>
              </div>
            ))}
            <button className="close-btn" onClick={() => setShowPreview(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
