import React, { useState, useEffect } from "react";
import menuData from "./data/menuData";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import GalleryPage from "./pages/Gallery";
import Reservation from "./pages/Reservation";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Account from "./pages/Account/Account";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import VerifyOtp from "./pages/VerifyOtp";

/* =========================
   APP WRAPPER
========================= */
function AppWrapper() {

  /* =========================
     MENU STATE (GLOBAL)
     USE FULL menuData + ADD FLAGS
  ========================== */
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem("menuItems");

    if (saved) return JSON.parse(saved);

    // Add visibility + availability to every dish
    return menuData.map(item => ({
      ...item,
      isVisible: true,
      isAvailable: true
    }));
  });

  /* SAVE MENU TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

  /* =========================
     CART STATE (PERSISTENT)
  ========================== */
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const showNavbar = !isAdminPage;
  const showFooter = !isAdminPage;

  /* SAVE CART */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* =========================
     ADD TO CART
  ========================== */
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />

      {showNavbar && <Navbar cart={cart} />}

      <Routes>

        {/* PUBLIC */}
        <Route
          path="/"
          element={<Home addToCart={addToCart} />}
        />

        {/* REAL MENU PAGE */}
        <Route
          path="/menu"
          element={
            <Menu
              menuItems={menuItems}
              addToCart={addToCart}
            />
          }
        />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<Contact />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login setCart={setCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* ACCOUNT */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart cart={cart} setCart={setCart} />
            </ProtectedRoute>
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              {cart.length === 0 ? (
                <Navigate to="/cart" replace />
              ) : (
                <Checkout
                  cart={cart}
                  setCart={setCart}
                  setOrderPlaced={setOrderPlaced}
                />
              )}
            </ProtectedRoute>
          }
        />

        {/* ORDER SUCCESS */}
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              {orderPlaced ? (
                <OrderSuccess />
              ) : (
                <Navigate to="/" replace />
              )}
            </ProtectedRoute>
          }
        />

        {/* RESERVATION */}
        <Route
          path="/reservation"
          element={
            <ProtectedRoute>
              <Reservation />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard
                menuItems={menuItems}
                setMenuItems={setMenuItems}
              />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

/* =========================
   MAIN APP
========================= */
export default function App() {
  return (
    <GoogleOAuthProvider clientId="1087223581356-cu4o4rtntoj43gldnkl3g4k2j2nfbq12.apps.googleusercontent.com">
      <Router>
        <AppWrapper />
      </Router>
    </GoogleOAuthProvider>
  );
}