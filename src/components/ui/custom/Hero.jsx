import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-5xl font-bold text-blue-700 mb-6 text-center">
        Plan Your Perfect Trip with AI ✈️
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Enter your destination, budget, and traveler type — let AI create your ideal itinerary!
      </p>
      <button
        onClick={() => navigate("/create-trip")}
        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Get Started, It's Free
      </button>
    </div>
  );
};

export default Hero;
