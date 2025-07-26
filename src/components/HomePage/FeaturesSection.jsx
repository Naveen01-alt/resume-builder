import { motion } from 'framer-motion';
import './FeatureSection.css';

const features = [
  { title: 'Live Preview', description: 'See changes instantly as you type.' },
  { title: 'PDF Export', description: 'Download your resume in high-quality PDF format.' },
  { title: 'Custom Templates', description: 'Choose from a variety of elegant designs.' },
  { title: 'Drag & Drop', description: 'Reorder sections with ease.' },
];

export default function FeaturesSection() {
  return (
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
  );
}
