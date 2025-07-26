import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Projects.css";

export default function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("userProjects");
    return saved
      ? JSON.parse(saved)
      : [{ title: "", techStack: "", description: "", link: "" }];
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", techStack: "", description: "", link: "" }
    ]);
  };

  useEffect(() => {
    localStorage.setItem("userProjects", JSON.stringify(projects));
  }, [projects]);

  return (
    <section className="projects-section">
      <h2 className="section-title">Projects</h2>

      {projects.map((project, index) => (
        <div key={index} className="project-card">
          <div className="form-grid">
            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
            />
            <input
              type="text"
              placeholder="Tech Stack (e.g., React, Node.js)"
              value={project.techStack}
              onChange={(e) => handleChange(index, "techStack", e.target.value)}
            />
          </div>
          <textarea
            rows="4"
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
          />
          <input
            type="url"
            placeholder="Live Link or GitHub URL (optional)"
            value={project.link}
            onChange={(e) => handleChange(index, "link", e.target.value)}
          />
        </div>
      ))}

      <div className="projects-buttons">
        <button className="add-more-btn" onClick={addProject}>
          + Add More Projects
        </button>
      </div>

      <div className="nav-buttons">
        <button className="back-btn" onClick={() => navigate("/aboutme")}>
          ⬅ Back
        </button>
        <button className="next-btn" onClick={() => navigate("/resumepreview")}>
          Next ➡
        </button>
        <button className="preview-btn" onClick={() => setShowPreview(true)}>
          🔍 Preview
        </button>
      </div>

      {showPreview && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="section-title">Projects Preview</h3>
            {projects.map((project, index) => (
              <div key={index} className="project-preview-card">
                <p><strong>Title:</strong> {project.title}</p>
                <p><strong>Tech Stack:</strong> {project.techStack}</p>
                <p><strong>Description:</strong> {project.description}</p>
                {project.link && (
                  <p><strong>Link:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>
                )}
              </div>
            ))}
            <button className="close-btn" onClick={() => setShowPreview(false)}>✖ Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
