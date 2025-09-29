import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import DashboardPage from "./pages/resto/DashboardPage";
import OrderPage from "./pages/resto/OrderPage";
import Layout from "./layouts/Layout";
import "./index.css";
import CostumerPage from "./pages/costumer/CostumerPage";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  return (
    <Routes>
      {/* Halaman tanpa navbar */}
      <Route path="costumer" element={<CostumerPage />} />
      <Route
        path="/login"
        element={<LoginPage onLogin={() => setIsAuth(true)} />}
      />
      <Route path="/register" element={<RegisterPage />} />


      {/* Halaman dengan navbar */}
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            isAuth ? <DashboardPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/order/:id"
          element={
            isAuth ? <OrderPage /> : <Navigate to="/login" replace />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
