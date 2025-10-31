// src/components/ui/custom/Hero.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PhotoIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

const heroBgImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop";

const Hero = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError("");
    } else {
      setSelectedFile(null);
      setPreview(null);
      setError("Please select a valid image file (jpeg or png).");
    }
  };

  const handleGoClick = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/predict-destination", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        navigate("/create-trip", { state: { destination: data.destination } });
      } else {
        setError(data.error || "Failed to identify destination.");
      }
    } catch (err) {
      console.error(err);
      setError("Could not connect to the AI server. Please ensure it's running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-white text-center px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${heroBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-sm"></div>

      {/* Header with Calligraphy Text */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-indigo-300 font-[Great_Vibes] drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] animate-pulse">
          VisionMate
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
          Plan Your Perfect Trip with <span className="text-blue-400">AI</span> ✈️
        </h1>

        <p className="max-w-2xl text-lg md:text-xl mb-10 text-white/90">
          Upload a photo or enter details — let our AI craft your dream travel
          plan in seconds!
        </p>

        <button
          onClick={() => navigate("/create-trip")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-full text-lg transition-all duration-300 shadow-lg hover:scale-105 mb-12"
        >
          Get Started — It’s Free
        </button>

        {/* Image Upload Card */}
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 transition-all hover:bg-white/20">
          <h3 className="text-2xl font-semibold mb-5 tracking-wide">
            Or Upload an Image 🌆
          </h3>

          <label
            htmlFor="file-upload"
            className={`relative flex justify-center items-center w-full h-60 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
              preview
                ? "border-transparent bg-cover bg-center"
                : "border-white/50 hover:border-white/80 bg-white/5"
            }`}
            style={{ backgroundImage: preview ? `url(${preview})` : "none" }}
          >
            {!preview && (
              <div className="text-center">
                <PhotoIcon className="mx-auto h-14 w-14 text-white/70" />
                <span className="mt-3 block text-base font-medium">
                  Click or drag image here
                </span>
              </div>
            )}
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
            />
          </label>

          {error && (
            <p className="text-red-300 bg-red-900/50 rounded-md py-2 mt-4 text-sm">
              {error}
            </p>
          )}

          <button
            onClick={handleGoClick}
            disabled={!selectedFile || loading}
            className="mt-6 w-full bg-white text-gray-900 font-bold py-3 rounded-full text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-gray-100 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="w-6 h-6 animate-spin" />
                Recognizing...
              </>
            ) : (
              <>
                Go <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
