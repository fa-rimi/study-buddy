import axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SignIn from "./components/authorization/SignIn";
import SignUp from "./components/authorization/SignUp";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import "./index.css";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.withCredentials = true;

function App() {
  // Initialize user state to null
  const [user, setUser] = useState(null);

  // Create components for AuthPg and Home for better readability
  const authPage = <AuthPage setUser={setUser} />;
  const homePage = <HomePage />;

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Router>
        {/* Define the routes for your application */}
        <Routes>
          {/* Route for the SignIn component */}
          <Route path="/SignIn" element={<SignIn />} />

          {/* Route for the SignUp component */}
          <Route path="/SignUp" element={<SignUp />} />

          {/* Route for the Home component */}
          <Route path="/Home" element={<HomePage />} />

          {/* Fallback route for the root URL "/", also conditionally rendering Home or AuthPg */}
          <Route path="/" element={user ? homePage : authPage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
