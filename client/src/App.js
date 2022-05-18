import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/Landing/LandingPage";
import LoginPage from "./components/views/Login/LoginPage";
import RegisterPage from "./components/views/Register/RegisterPage";
import UploadProductPage from "./components/views/Upload/UploadProductPage";
import Auth from "./hoc/auth";
import NavBar from "./components/views/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={Auth(LandingPage, null)} />
        <Route path="/login" element={Auth(LoginPage, false)} />
        <Route path="/register" element={Auth(RegisterPage, false)} />
        <Route path="/product/upload" element={Auth(UploadProductPage, true)} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
