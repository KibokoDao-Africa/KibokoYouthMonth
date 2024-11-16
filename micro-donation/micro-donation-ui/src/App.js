// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePool from "./pages/CreatePool";
import "./App.css"; // Optional, if you have any app-level styles

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mx-auto mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-pool" element={<CreatePool />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
