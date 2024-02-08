import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/auth/SignUp";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./pages/auth/SignIn";
import MainLayout from "./layout/MainLayout";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";

function App() {
  const ProtectedRoute = ({ path, element: Component }) => {
    const token = localStorage.getItem("_token");

    if (!token) {
      // Redirect the user to the login page or another route
      return <Navigate to="/auth/login" />;
    }

    return <Route path={path} element={<Component />} />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/details/:id" element={<OrderDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
