import { useState, useEffect } from 'react';
import './PersonalInfo.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PersonalInfo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('personalInfo');
    return saved ? JSON.parse(saved) : {
      firstName: '',
      surname: '',
      profession: '',
      country: '',
      city: '',
      pin: '',
      phone: '',
      email: '',
      linkedin: '',
      website: '',
    };
  });

  const [photo, setPhoto] = useState(() => {
    return localStorage.getItem('photo') || null;
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      setPhoto(base64Image);
      localStorage.setItem("photo", base64Image);
    };

    reader.readAsDataURL(file);
  }
};

  // 📝 Auto-save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('personalInfo', JSON.stringify(formData));
  }, [formData]);

  return (
    
    <section className="personal-container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        </motion.h1>
      

    
      <div className="personal-left">
         <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="personal-heading">What's the best way for employers to contact you?</h2>
        <p className="personal-subtext">We suggest including an email and phone number.</p>
    </motion.h1>
        <form className="personal-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <input type="text" placeholder="Surname" name="surname" value={formData.surname} onChange={handleChange} required />
          </div>

          <div className="form-row">
  
            <input type="text" placeholder="Profession" name="profession" value={formData.profession} onChange={handleChange} />
            <input type="text" placeholder="Country" name="country" value={formData.country} onChange={handleChange} />
              
       </div>
              

          <div className="form-row">
            <input type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} />
            <input type="text" placeholder="PIN Code" name="pin" value={formData.pin} onChange={handleChange} />
          </div>

          <div className="form-row">
            <input type="tel" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="optional-links">
            <label>Add additional information</label>
            <div className="form-row">
              <input type="text" placeholder="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} />
              <input type="text" placeholder="Website" name="website" value={formData.website} onChange={handleChange} />
                  
            </div>
          </div>

          <div className="personal-buttons">
            <button type="button" className="btn-preview" onClick={() => setShowPreview(true)}>Preview</button>
            <button type="button" className="btn-next" onClick={() => navigate('/education')}><strong>Next: Education</strong></button>
            <button type="button" className="btn-next" onClick={() => navigate('/')}><strong>Back</strong></button>
          </div>
        </form>
      </div>
      

      <div className="personal-right">
        <div className="photo-section">
          <div className="photo-preview">
            {photo ? <img src={photo} alt="Uploaded" /> : <div className="photo-placeholder">Upload Photo</div>}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="photo-input"
          />
        
        </div>
      
      </div>

      {showPreview && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Preview Info</h3>
            {photo && <img src={photo} alt="Profile" className="modal-photo" />}
            <p><strong>Name:</strong> {formData.firstName} {formData.surname}</p>
            <p><strong>Profession:</strong> {formData.profession}</p>
            <p><strong>Country:</strong> {formData.country}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>PIN:</strong> {formData.pin}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>LinkedIn:</strong> {formData.linkedin}</p>
            <p><strong>Website:</strong> {formData.website}</p>
            <button className="close-btn" onClick={() => setShowPreview(false)}>Close</button>
          </div>
        </div>
      )}
      
    </section>
    
  );
}
