import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/Landing/LandingPage";
import LoginPage from "./components/views/Login/LoginPage";
import RegisterPage from "./components/views/Register/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
