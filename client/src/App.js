import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/Landing/LandingPage";
import LoginPage from "./components/views/Login/LoginPage";
import RegisterPage from "./components/views/Register/RegisterPage";
import UploadProductPage from "./components/views/Upload/UploadProductPage";
import Auth from "./hoc/auth";
import NavBar from "./components/views/Navbar/Navbar";
import DetailProductPage from "./components/views/DetailProductPage/DetailProductPage";

import DataUpload from "./components/views/Review/DataUpload";
import ShowAllData from "./components/views/Review/ShowAllData";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={Auth(LandingPage, null)} />
        <Route path="/login" element={Auth(LoginPage, false)} />
        <Route path="/register" element={Auth(RegisterPage, false)} />
        <Route path="/product/upload" element={Auth(UploadProductPage, true)} />
        <Route
          path="/product/:productId"
          element={Auth(DetailProductPage, null)}
        />
        {/* 복습 */}
        <Route path="/review/data" element={Auth(DataUpload, true)} />
        <Route path="/review" element={Auth(ShowAllData, null)} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
