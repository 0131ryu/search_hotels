import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/Landing/LandingPage";
import LoginPage from "./components/views/Login/LoginPage";
import RegisterPage from "./components/views/Register/RegisterPage";
// import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={LandingPage} />
          <Route path="/login" element={LoginPage} />
          <Route path="/register" element={RegisterPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
