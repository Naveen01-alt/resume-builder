import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./About.css";

export default function About() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState("");
  const [strengths, setStrengths] = useState([""]);
  const [weaknesses, setWeaknesses] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [showPreview, setShowPreview] = useState(false);

  // Load existing data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("aboutMe"));
    if (saved) {
      setSummary(saved.summary || "");
      setStrengths(saved.strengths || [""]);
      setWeaknesses(saved.weaknesses || [""]);
      setLanguages(saved.languages || [""]);
    }
  }, []);

  // Save updated data
  useEffect(() => {
    const aboutMe = {
      summary,
      strengths: strengths.filter(Boolean),
      weaknesses: weaknesses.filter(Boolean),
      languages: languages.filter(Boolean),
    };
    localStorage.setItem("aboutMe", JSON.stringify(aboutMe));
  }, [summary, strengths, weaknesses, languages]);

  const handleChange = (setter, list, idx, value) => {
    const updated = [...list];
    updated[idx] = value;
    setter(updated);
  };

  const addField = (setter, list) => {
    setter([...list, ""]);
  };

  return (
    <motion.section
      className="about-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Tell Us About Yourself</h2>

      <div className="form-group">
        <label>Professional Summary</label>
        <textarea
          rows="5"
          value={summary}
          placeholder="Brief overview of your experience, goals, or interests..."
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Strengths</label>
        {strengths.map((item, idx) => (
          <input
            key={idx}
            value={item}
            placeholder={`Strength #${idx + 1}`}
            onChange={(e) => handleChange(setStrengths, strengths, idx, e.target.value)}
          />
        ))}
        <button onClick={() => addField(setStrengths, strengths)}>+ Add Strength</button>
      </div>

      <div className="form-group">
        <label>Weaknesses</label>
        {weaknesses.map((item, idx) => (
          <input
            key={idx}
            value={item}
            placeholder={`Weakness #${idx + 1}`}
            onChange={(e) => handleChange(setWeaknesses, weaknesses, idx, e.target.value)}
          />
        ))}
        <button onClick={() => addField(setWeaknesses, weaknesses)}>+ Add Weakness</button>
      </div>

      <div className="form-group">
        <label>Languages Known</label>
        {languages.map((item, idx) => (
          <input
            key={idx}
            value={item}
            placeholder={`Language #${idx + 1}`}
            onChange={(e) => handleChange(setLanguages, languages, idx, e.target.value)}
          />
        ))}
        <button onClick={() => addField(setLanguages, languages)}>+ Add Language</button>
      </div>

      <div className="about-buttons">
        <button onClick={() => navigate("/workexperience")}>⬅ Back</button>
        <button onClick={() => setShowPreview(true)}>🔍 Preview</button>
        <button onClick={() => navigate("/projects")}>Next ➡</button>
      </div>

      <AnimatePresence>
        {showPreview && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="modal"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3>Preview</h3>
              <p><strong>Summary:</strong> {summary}</p>
              <p><strong>Strengths:</strong> {strengths.filter(Boolean).join(", ")}</p>
              <p><strong>Weaknesses:</strong> {weaknesses.filter(Boolean).join(", ")}</p>
              <p><strong>Languages:</strong> {languages.filter(Boolean).join(", ")}</p>
              <button onClick={() => setShowPreview(false)}>✖ Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
