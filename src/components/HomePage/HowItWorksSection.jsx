import { motion } from 'framer-motion';
import './HowItWorks.css';

const steps = [
  { step: 1, title: 'Choose a Template', description: 'Pick from modern, professional templates designed to impress.' },
  { step: 2, title: 'Add Your Details', description: 'Fill in your personal info, work experience, skills, and more.' },
  { step: 3, title: 'Download or Share', description: 'Export your resume or share it instantly with a public link.' },
];

export default function HowItWorksSection() {
  return (
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
  );
}
