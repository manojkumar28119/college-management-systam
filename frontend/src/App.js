// Import necessary modules
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import components
import SignIn from './components/Signin'; // Replace with the actual path to your Signin component
import Home from './components/Home';     // Replace with the actual path to your Home component

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the signin path */}
        <Route path="/signin" element={<SignIn />} />
        
        {/* Define the home path */}
        <Route path="/" element={<Home />} />
        
        {/* Optionally, set a default route or 404 page */}
        <Route path="*" element={<SignIn />} />  {/* Redirect any unmatched path to signin */}
      </Routes>
    </Router>
  );
}

export default App;
