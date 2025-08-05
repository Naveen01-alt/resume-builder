import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Herosection from './components/HomePage/Herosection';
import FeaturesSection from './components/HomePage/FeaturesSection';
import HowItWorksSection from './components/HomePage/HowItWorksSection';
import Footer from './components/HomePage/Footer';
import Navbar from './components/HomePage/Navbar';
import TemplateSelection from './components/Templates/TemplateSelection';
import PersonalInfo from './components/Builder/PersonalInfo';
import Education from './components/Builder/Education';
import Skills from './components/Builder/Skills';
import WorkExperience from './components/Builder/WorkExperiance';
import AboutMe from './components/Builder/AboutMe';
import Projects from './components/Builder/Projects';
import ResumePreview from './components/Builder/ResumePreview';
import StepProgressBar from './components/Builder/StepProgressBar';
import Declaration from './components/Builder/Declaration';

function HomePage() {
  return (
    <main className="font-sans">
      <Navbar />
      <Herosection />
      
      <Footer />
    </main>
  );
}

// 👉 Wrapper component to access useLocation and render StepProgressBar conditionally
function LayoutWithProgress() {
  const location = useLocation();

  const showProgressRoutes = [
    '/personalinfo',
    '/education',
    '/skills',
    '/workexperience',
    '/projects',
    '/aboutme',
    '/declaration',
    '/resumepreview'
  ];

  const shouldShowProgress = showProgressRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {shouldShowProgress && <StepProgressBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates" element={<TemplateSelection />} />
        <Route path="/builder" element={<PersonalInfo />} />
        <Route path="/herosection" element={<Herosection />} />
        <Route path="/education" element={<Education />} />
        <Route path="/personalinfo" element={<PersonalInfo />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/workexperience" element={<WorkExperience />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resumepreview" element={<ResumePreview />} />
        <Route path="/declaration" element={<Declaration/>}/>
        <Route path="/featuresection" element={<FeaturesSection/>}/>
        <Route path="/templateselection" element={<TemplateSelection/>}/>
        <Route path="/howitworkssection" element={<HowItWorksSection/>}/>
        

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWithProgress />
    </Router>
  );
}
