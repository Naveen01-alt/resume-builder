import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Declaration.css";

const Declaration = () => {
  const [declaration, setDeclaration] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("declaration");
    if (saved) {
      setDeclaration(saved);
    }
  }, []);

  const handleChange = (e) => {
    setDeclaration(e.target.value);
    localStorage.setItem("declaration", e.target.value);
  };

  return (
    <div className="declaration-container">
      <div className="declaration-box">
        <h2 className="declaration-title">📜 Declaration</h2>
        <textarea
          className="declaration-textarea"
          rows="6"
          placeholder="Enter your declaration text here..."
          value={declaration}
          onChange={handleChange}
        ></textarea>
        <button className="declaration-btn" onClick={() => navigate("/resumepreview")}>
          Next ➡
        </button>
        <button className="declaration-btn" onClick={() => navigate("/projects")}>
          Back ➡
        </button>
      </div>
    </div>
  );
};

export default Declaration;
