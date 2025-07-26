import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Skills.css'

export default function Skills() {
  const navigate = useNavigate();

  // ✅ Load saved skills from localStorage (if any)
  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem("skillsList");
    return saved ? JSON.parse(saved) : [""];
  });

  const [showPreview, setShowPreview] = useState(false);

  // ✅ Save skills to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("skillsList", JSON.stringify(skills));
  }, [skills]);

  const handleChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  return (
    <section className="skills-section">
      <h2 className="section-title">Skills</h2>
      <div className="desc">
        <marquee>
          <h4>Try to pick skills that are relevant to the job you want</h4>
        </marquee>
      </div>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Skill #${index + 1}`}
            value={skill}
            onChange={(e) => handleChange(index, e.target.value)}
            className="skill-input"
          />
        ))}
        <button onClick={addSkill} className="add-skill-btn">
          + Add Another Skill
        </button>
      </div>

      <div className="skills-buttons">
        <button onClick={() => navigate("/education")} className="back-btn">
          Back
        </button>
        <button onClick={() => setShowPreview(true)} className="preview-btn">
          Preview
        </button>
        <button onClick={() => navigate("/workexperience")} className="next-btn">
          Next
        </button>
      </div>

      {showPreview && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="section-title">Skills Preview</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>✔️ {skill}</li>
              ))}
            </ul>
            <button
              className="close-btn"
              onClick={() => setShowPreview(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
