// src/components/ui/custom/Hero.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhotoIcon, PaperAirplaneIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

// Replace this with the actual path to your hero background image
const heroBgImage = "https://images.unsplash.com/photo-1495365200442-43414a932b5b?q=80&w=2070&auto=format&fit=crop";

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
      // Fetch from the new Python Flask server on port 8000
      const response = await fetch("http://localhost:8000/predict-destination", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok && data.ok) {
        // On success, navigate to the create-trip page and pass the destination in the state
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
      className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
        Plan Your Perfect Trip with AI ✈️
      </h1>
      <p className="max-w-2xl text-lg md:text-xl mb-8 text-white/90">
        Enter your destination, budget, and traveler type — or simply upload a
        photo to let AI recognize your dream destination!
      </p>
      <button 
        onClick={() => navigate('/create-trip')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg mb-10"
      >
        Get Started, It's Free
      </button>

      {/* Image Uploader Card */}
      <div className="w-full max-w-lg bg-black/30 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/30">
        <h3 className="text-xl font-bold mb-4">Or Upload an Image 🌆</h3>
        
        <label
          htmlFor="file-upload"
          className="relative flex justify-center items-center w-full h-56 bg-cover bg-center border-2 border-dashed border-white/50 rounded-2xl cursor-pointer hover:border-white/80 transition-all duration-300"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {!preview && (
            <div className="text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-white/70" />
              <span className="mt-2 block font-medium">Click to upload an image</span>
            </div>
          )}
          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg"/>
        </label>
        
        {error && <p className="text-red-300 bg-red-900/50 rounded-md py-1 mt-3 text-sm">{error}</p>}
        
        <button
          onClick={handleGoClick}
          disabled={!selectedFile || loading}
          className="mt-4 w-full bg-white text-gray-800 font-bold py-3 px-6 rounded-full text-lg flex items-center justify-center gap-2 transition duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-gray-200"
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
  );
};

export default Hero;