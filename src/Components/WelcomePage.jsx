import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import diabetesImage from '../images/diabetes.png'; // ✅ Import the image

function WelcomePage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/predict');
  };

  return (
    <div
      className="welcome-container"
      style={{ backgroundImage: `url(${diabetesImage})` }} // ✅ Inject image here
    >
      <h1 className="welcome-heading">WELCOME TO DIABETIC CARE</h1>
      <button className="start-button" onClick={handleStartClick}>
        Let's Get Started
      </button>
    </div>
  );
}

export default WelcomePage;
