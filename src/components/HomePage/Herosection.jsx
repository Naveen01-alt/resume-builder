import { motion } from 'framer-motion';
import './Herosection.css';
import { useNavigate } from 'react-router-dom';

const features = [
  { title: 'Live Preview', description: 'See changes instantly as you type.' },
  { title: 'PDF Export', description: 'Download your resume in high-quality PDF format.' },
  { title: 'Custom Templates', description: 'Choose from a variety of elegant designs.' },
  { title: 'Drag & Drop', description: 'Reorder sections with ease.' },
];

const steps = [
  { step: 1, title: 'Choose a Template', description: 'Pick from modern, professional templates designed to impress.' },
  { step: 2, title: 'Add Your Details', description: 'Fill in your personal info, work experience, skills, and more.' },
  { step: 3, title: 'Download or Share', description: 'Export your resume or share it instantly with a public link.' },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Build Your Resume Like a Pro
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Create beautiful, professional resumes in minutes with our easy-to-use builder.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <button className="hero-btn primary" onClick={() => navigate('/builder')}>
            Start Building
          </button>
          <button className="hero-btn secondary" onClick={() => navigate('/templates')}>
            View Templates
          </button>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        <div className="feature-wrapper">
          <motion.h2
            className="feature-title"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Powerful Features
          </motion.h2>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-desc">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section">
        <div className="how-wrapper">
          <motion.h2
            className="how-title"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            How It Works
          </motion.h2>

          <div className="how-grid">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className="how-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="how-step">{step.step}</div>
                <h3 className="how-step-title">{step.title}</h3>
                <p className="how-step-desc">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
