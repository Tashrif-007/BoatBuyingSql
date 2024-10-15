import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in when the component mounts
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true); // Set login state to true if userId exists
    }
  }, [isLoggedIn]); // Empty dependency array to run once on mount

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
