import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/Landing/LandingPage";
import LoginPage from "./components/views/Login/LoginPage";
import RegisterPage from "./components/views/Register/RegisterPage";
import UploadProductPage from "./components/views/Upload/UploadProductPage";
import Auth from "./hoc/auth";
import NavBar from "./components/views/Navbar/Navbar";
import DetailProductPage from "./components/views/DetailProductPage/DetailProductPage";
import CartPage from "./components/views/CartPage/CartPage";
import HistoryPage from "./components/views/HistoryPage/HistoryPage";

import DataUpload from "./components/views/Review/DataUpload";
import ShowAllData from "./components/views/Review/ShowAllData";
import ShowDatailData from "./components/views/Review/ShowDatailData";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={Auth(LandingPage, null)} />
        {/* admin : <Route path="/login" element={Auth(LoginPage, false, true)} /> */}
        <Route path="/login" element={Auth(LoginPage, false)} />
        <Route path="/register" element={Auth(RegisterPage, false)} />
        <Route path="/product/upload" element={Auth(UploadProductPage, true)} />
        <Route
          path="/product/:productId"
          element={Auth(DetailProductPage, null)}
        />
        <Route path="/user/cart" element={Auth(CartPage, true)} />
        <Route path="/history" element={Auth(HistoryPage, true)} />
        {/* 복습 */}
        <Route path="/review/data" element={Auth(DataUpload, true)} />
        <Route path="/review" element={Auth(ShowAllData, null)} />
        <Route
          path="/reveiw/data/:dataId"
          element={Auth(ShowDatailData, null)}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
