import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import SessionPage from './SessionPage';
import SwipingPage from './SwipingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/swiping" element={<SwipingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
