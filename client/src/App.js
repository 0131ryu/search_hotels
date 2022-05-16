import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/Landing/LandingPage";
import LoginPage from "./components/views/Login/LoginPage";
import RegisterPage from "./components/views/Register/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Auth(LandingPage, null)} />
        <Route path="/login" element={Auth(LoginPage, false)} />
        <Route path="/register" element={Auth(RegisterPage, false)} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
