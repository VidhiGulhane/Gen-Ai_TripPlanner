import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/ui/custom/Header.jsx";
import Hero from "./components/ui/custom/Hero.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header /> {/* Render Header once */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </div>
  );
}

export default App;
