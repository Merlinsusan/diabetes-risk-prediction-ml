
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PredictionPage.css';

function PredictionPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: '',
  });

  const [loading, setLoading] = useState(false); // 🌀 Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start spinner

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        setLoading(false);
        alert(`❌ Error: ${data.error}`);
      } else {
        setTimeout(() => {
          setLoading(false);
          navigate('/result', {
            state: {
              prediction: data.prediction,
              probability_0: data.probability_0,
              probability_1: data.probability_1,
              formData: formData,
            },
          });
        }, 2000); // Delay navigation by 2 seconds
      }
    } catch (error) {
      setLoading(false);
      alert(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className={`form-container ${loading ? 'blurred' : ''}`}>
      <h1>DIABETES PREDICTION</h1>

      <form className="form-grid" onSubmit={handleSubmit}>
        {/* All form inputs */}
        <div className="form-group">
          <label>Pregnancies</label>
          <input type="number" name="Pregnancies"  placeholder="No. of Pregnancies" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Glucose Level</label>
          <input type="number" name="Glucose"  placeholder="Glucose Level (in mg/dL)"onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Blood Pressure</label>
          <input type="number" name="BloodPressure"  placeholder="Blood Pressure (in mm Hg)"onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Skin Thickness</label>
          <input type="number" name="SkinThickness" placeholder="Skin Thickness (in mm)" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Insulin</label>
          <input type="number" name="Insulin" placeholder="Insulin" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>BMI</label>
          <input type="number" name="BMI"placeholder="BMI" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Diabetes Pedigree Function</label>
          <input type="number" step="0.01" name="DiabetesPedigreeFunction"placeholder="Diabetes Pedigree Function" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" name="Age" placeholder="Age (in yrs)" onChange={handleChange} required />
        </div>

        <div className="form-button">
          <button type="submit" disabled={loading}>Predict</button>
        </div>
      </form>

      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
          <p>Predicting...</p>
        </div>
      )}
    </div>
  );
}

export default PredictionPage;
