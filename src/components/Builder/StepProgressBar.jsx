import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StepProgressBar.css';

export default function StepProgressBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    { path: '/personalinfo', label: 'Personal Info' },
    { path: '/education', label: 'Education' },
    { path: '/skills', label: 'Skills' },
    { path: '/workexperience', label: 'WorkExperience' },
    { path: '/aboutme', label: 'AboutMe' },
    { path: '/projects', label: 'Projects' },
    { path: '/resumepreview', label: 'Preview' },
  ];

  const currentIndex = steps.findIndex(step => location.pathname.startsWith(step.path));
  const progressPercent = ((currentIndex + 1) / steps.length) * 100;

  const handleStepClick = (path) => {
    navigate(path);
  };

  return (
    <div className="progress-container">
      <div className="step-labels">
        {steps.map((step, index) => (
          <span
            key={step.path}
            className={`step-label ${index <= currentIndex ? 'active' : ''}`}
            onClick={() => handleStepClick(step.path)}
            style={{ cursor: 'pointer' }}
          >
            {step.label}
          </span>
        ))}
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  );
}
