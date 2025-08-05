import './TemplateSelection.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PersonalInfo from '../Builder/PersonalInfo';
import Navbar from '../HomePage/Navbar';

const templates = [
  { id: 1, name: 'Modern', image: '/template1.webp' },
  { id: 2, name: 'Professional', image: '/template2.webp' },
  { id: 3, name: 'Attractive', image: '/template3.webp' },
  { id: 4, name: 'Professional', image: '/template4.jpeg' },
  { id: 5, name: 'Creative', image: '/template5.webp' },
  { id: 6, name: 'Minimal', image: '/template6.webp' },
];

export default function TemplateSelection() {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const navigate = useNavigate();

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const handleSelect = (template) => {
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
    navigate('/builder'); // adjust this route to your builder component
  };

  return (
    <>
    <Navbar/>
    
    <section className="template-section">
      
      <div className="template-wrapper">
        <motion.h2 
          className="template-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Choose Your Style
        </motion.h2>

        <div className="template-grid">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              className="template-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <img src={template.image} alt={template.name} className="template-image" />
              <div className="template-caption">
                <h3 className="template-name">{template.name}</h3>
              </div>
              <div className="template-buttons">
                <button className="select-btn" onClick={() => handleSelect(PersonalInfo)}>Choose</button>
                <button className="preview-btn" onClick={() => handlePreview(template)}>Preview</button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Preview */}
        {previewTemplate && (
          <div className="modal-overlay" onClick={() => setPreviewTemplate(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>{previewTemplate.name}</h2>
              <img src={previewTemplate.image} alt={previewTemplate.name} className="modal-image" />
              <button onClick={() => setPreviewTemplate(null)} className="close-btn">Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
