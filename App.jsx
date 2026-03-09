import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <Header />    {/* This is the top menu */}
      <Routes>
        <Route path="/" element={<Home />} />   {/* This shows Home page */}
      </Routes>
      <Footer />    {/* This is the bottom footer */}
    </Router>
  );
}

export default App;
