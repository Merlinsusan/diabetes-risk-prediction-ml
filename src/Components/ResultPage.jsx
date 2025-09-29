import React from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css';
import logo from '../images/Diabetes detected.png'; 
import logo1 from '../images/nodiabetes.png'; // 👈 adjust this path if needed


const ResultPage = () => {
  const location = useLocation();
  const { prediction } = location.state || {};

  return (
    <div className="result-container">
      
      

      {prediction === 1 ? (
        <>
          <img src={logo} alt="Logo" className="logo" />
          <h2> Diabetes detected.</h2>
          {/* <p>Please consult a doctor and take preventive measures.</p> */}
        </>
      ) : (
        <>
          <img src={logo1} alt="Logo" className="logo" />
          <h2>Yay! No Diabetes Found.</h2>
          
        </>
      )}
    </div>
  );
};

export default ResultPage;
