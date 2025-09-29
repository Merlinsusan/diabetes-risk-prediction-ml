import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import PredictionPage from './Components/PredictionPage'; // ✅ Add this
import ResultPage from './Components/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/predict" element={<PredictionPage />} /> {/* ✅ New route */}
        <Route path="/result" element={<ResultPage />} />

      </Routes>
    </Router>
  );
}

export default App;
