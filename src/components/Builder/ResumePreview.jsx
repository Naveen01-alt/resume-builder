import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Preview.css";

const themes = {
  light: "theme-light",
  dark: "theme-dark",
  blue: "theme-blue",
  elegant: "theme-elegant",
};

export default function ResumePreview() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [photo, setPhoto] = useState(null);
  const resumeRef = useRef();

  useEffect(() => {
    const savedPhoto = localStorage.getItem("photo");
    if (savedPhoto) setPhoto(savedPhoto);
  }, []);

  const getData = (key) => {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  };

  const personal = getData("personalInfo");
  const education = getData("educationList");
  const skills = getData("skillsList");
  const work = getData("workList");
  const projects = getData("userProjects");

  const about = {
    summary: localStorage.getItem("aboutMeSummary") || "",
    strengths: getData("aboutMeStrengths"),
    weaknesses: getData("aboutMeWeaknesses"),
    languages: getData("aboutMeLanguages"),
  };

  const downloadPDF = async () => {
    const input = resumeRef.current;
    if (!input) return;

    const A4_WIDTH = 210;
    const A4_HEIGHT = 297;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      windowWidth: input.scrollWidth,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = A4_WIDTH;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    if (pdfHeight <= A4_HEIGHT) {
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    } else {
      let heightLeft = pdfHeight;
      let position = 0;
      while (heightLeft > 0) {
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= A4_HEIGHT;
        position -= A4_HEIGHT;
        if (heightLeft > 0) pdf.addPage();
      }
    }

    pdf.save("resume.pdf");
  };

  return (
    <div className="preview-wrapper">
      <div className="theme-selector">
        <label>🎨 Theme:</label>
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          {Object.keys(themes).map((theme) => (
            <option value={theme} key={theme}>
              {theme.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`resume-page ${themes[selectedTheme]}`}
        ref={resumeRef}
        style={{
          overflow: "hidden",
          width: "794px", // A4 width in pixels @ 96dpi
          minHeight: "1123px", // A4 height in pixels @ 96dpi
          padding: "20px",
          margin: "0 auto",
          backgroundColor: "#fff",
        }}
      >
        <div className="resume-inner">
          <aside className="resume-left">
            {photo && (
              <img src={photo} alt="Profile" className="profile-photo" />
            )}
            {personal && (
              <section>
                <h3>CONTACT</h3>
                <p>📞 {personal.phone}</p>
                <p>📧 {personal.email}</p>
                <p>📍 {personal.city}, {personal.country}</p>
                {personal.linkedin && <p>🔗 {personal.linkedin}</p>}
                {personal.website && <p>🌐 {personal.website}</p>}
              </section>
            )}
            {skills.length > 0 && (
              <section>
                <h3>SKILLS</h3>
                <ul>{skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </section>
            )}
            {(about.summary || about.strengths.length || about.weaknesses.length || about.languages.length) && (
              <section>
                <h3>ABOUT</h3>
                {about.summary && <p>{about.summary}</p>}
                {about.strengths.length > 0 && (
                  <>
                    <p><strong>Strengths:</strong></p>
                    <ul>{about.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                  </>
                )}
                {about.weaknesses.length > 0 && (
                  <>
                    <p><strong>Weaknesses:</strong></p>
                    <ul>{about.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
                  </>
                )}
                {about.languages.length > 0 && (
                  <>
                    <p><strong>Languages:</strong></p>
                    <ul>{about.languages.map((l, i) => <li key={i}>{l}</li>)}</ul>
                  </>
                )}
              </section>
            )}
          </aside>

          <main className="resume-right">
            {personal && (
              <header>
                <h1>{personal.firstName} {personal.surname}</h1>
                <h2>{personal.profession}</h2>
              </header>
            )}
            {work.length > 0 && (
              <section>
                <h3>EXPERIENCE</h3>
                {work.map((job, i) => (
                  <div key={i}>
                    <p><strong>{job.jobTitle}</strong> @ {job.employer}</p>
                    <p>{job.startDate} - {job.endDate}</p>
                    <ul>
                      {job.description?.split(".").map((line, j) =>
                        line.trim() && <li key={j}>{line.trim()}.</li>
                      )}
                    </ul>
                  </div>
                ))}
              </section>
            )}
            {education.length > 0 && (
              <section>
                <h3>EDUCATION</h3>
                {education.map((edu, i) => (
                  <div key={i}>
                    <p><strong>{edu.degree}</strong> — {edu.school}</p>
                    <p>{edu.start} - {edu.end}</p>
                  </div>
                ))}
              </section>
            )}
            {projects.length > 0 && (
              <section>
                <h3>PROJECTS</h3>
                {projects.map((proj, i) => (
                  <div key={i}>
                    <p><strong>{proj.title}</strong></p>
                    <p>{proj.description}</p>
                    {proj.link && (
                      <p>
                        <a href={proj.link} target="_blank" rel="noreferrer">
                          🔗 {proj.link}
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>

      <div className="resume-actions">
        <button onClick={downloadPDF}>📥 Download</button>
        <button onClick={() => navigate("/projects")}>Edit ➡</button>
      </div>
    </div>
  );
}
