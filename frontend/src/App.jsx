import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AssetCrud from "./pages/AssetCrud";
import AssetManagement from "./pages/AssetManagement";
import MyAssets from "./pages/MyAssets";

export default function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/assets"
          element={role === "admin" ? <AssetCrud /> : <Navigate to="/login" />}
        />
        <Route
          path="/manage"
          element={
            role === "admin" ? <AssetManagement /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/my-assets"
          element={
            role === "employee" ? <MyAssets /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
