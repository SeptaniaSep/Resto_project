import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import DashboardPage from "./pages/resto/DashboardPage";
import OrderPage from "./pages/resto/OrderPage";
import Layout from "./layouts/Layout";
import "./index.css";

function App() {
  return (
    <Routes>
      {/* Halaman tanpa navbar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Halaman dengan navbar */}
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
