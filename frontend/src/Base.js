import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
  
import About from "./About";
import App from "./App";

function Base() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
              <Route path="/" element={<App />} />
              <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default Base;
