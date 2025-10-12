import React from "react";

// 1. ACCEPT setCurrentPage AS A PROP
function Hero({ setCurrentPage }) {
  return (
    // Hero container: center everything and add vertical padding
    <div className="flex flex-col items-center justify-center text-center pt-24 pb-48 px-4 sm:px-6 lg:px-8">
      {/* Main Headline Group */}
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl">
        {/* Part 1: Color Text */}
        <span className="block text-red-600">
          Discover Your Next Adventure with AI:
        </span>

        {/* Part 2: Dark Text */}
        <span className="block mt-2">
          Personalized Itineraries at Your Fingertips
        </span>
      </h1>

      {/* Subtitle/Description */}
      <p className="mt-6 text-xl text-gray-600 max-w-2xl">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>

      {/* CTA Button */}
      <div className="mt-10">
        <button
          // 2. ADD onClick HANDLER TO CHANGE THE PAGE STATE
          onClick={() => setCurrentPage("create-trip")}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Get Started, It's Free
        </button>
      </div>
    </div>
  );
}

export default Hero;
