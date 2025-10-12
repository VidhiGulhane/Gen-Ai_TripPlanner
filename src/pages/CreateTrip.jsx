import React from "react";

// You will create this card component in Step 3
import OptionCard from "./OptionCard";

function CreateTrip() {
  return (
    // Main content area, centered and with padding
    <div className="flex flex-col items-center p-8 bg-white min-h-screen">
      {/* 1. Header Text Section (Image 2dcec2.png) */}
      <div className="text-center mb-10 max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Tell us your travel preferences 🌴✈️
        </h1>
        <p className="text-gray-600">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>
      </div>

      {/* 2. The Main Form Container */}
      <div className="w-full max-w-4xl">
        {/* --- Question 1: Destination --- */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            What is destination of choice?
          </h2>
          {/* Destination Dropdown/Input */}
          <input
            type="text"
            placeholder="New York, NY, USA"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
            // In a real app, this would be a search/select component
            defaultValue="New York, NY, USA"
          />
        </div>

        {/* --- Question 2: Duration --- */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            How many days are you planning your trip?
          </h2>
          {/* Duration Input */}
          <input
            type="number"
            placeholder="2"
            className="w-full p-3 border border-white-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
            defaultValue="2"
            min="1"
          />
        </div>

        {/* --- Question 3: Budget (Image 2dcbf1.png) --- */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">What Is Your Budget?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OptionCard
              emoji="💵"
              title="Cheap"
              subtitle="Stay conscious of costs"
              isSelected={false} // Set one as selected initially
            />
            <OptionCard
              emoji="💰"
              title="Moderate"
              subtitle="Keep cost on the average side"
              isSelected={false}
            />
            <OptionCard
              emoji="💎"
              title="Luxury"
              subtitle="Don't worry about cost"
              isSelected={false}
            />
          </div>
        </div>

        {/* --- Question 4: Travel Companions (Image 2dcbf1.png) --- */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <OptionCard
              emoji="✈️"
              title="Just Me"
              subtitle="A sole traveler in exploration"
            />
            <OptionCard
              emoji="🥂"
              title="A Couple"
              subtitle="Two travelers in tandem"
            />
            <OptionCard
              emoji="👨‍👩‍👧‍👦"
              title="Family"
              subtitle="A group of fun loving adv"
            />
            <OptionCard
              emoji="⛵"
              title="Friends"
              subtitle="A bunch of thrill-seekers"
            />
          </div>
        </div>
      </div>

      {/* 3. Generate Trip Button (Fixed at bottom or placed at end) */}
      <div className="mt-10 mb-20">
        <button className="px-8 py-3 bg-black text-white text-lg font-medium rounded-md shadow-lg hover:bg-gray-800 transition duration-150">
          Generate Trip
        </button>
      </div>
    </div>
  );
}

export default CreateTrip;
