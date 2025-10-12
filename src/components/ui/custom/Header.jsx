import React from "react";

function Header() {
  return (
    // Outer container: full width, white background, shadow, padding, and Flexbox for alignment
    <div className="flex justify-between items-center p-4 md:p-6 shadow-sm bg-white">
      {/* Left side: Logo and Text */}
      <div className="flex items-center space-x-2">
        {/* SVG Icon (The red alert triangle is from a common library, here as raw SVG) */}
        <svg
          className="h-8 w-8 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
        <span className="text-xl font-bold text-gray-800">Logoipsum</span>
      </div>

      {/* Right side: Sign In Button */}
      <div>
        <button
          className="text-sm font-medium text-skyblue
        -800 border border-gray-300 py-1.5 px-4 rounded-lg hover:bg-gray-50 transition duration-150 bg-white text-gray-900"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Header; // <--- The component is correctly exported
