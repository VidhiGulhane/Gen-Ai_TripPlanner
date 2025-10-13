import React, { useState } from "react";
import {
  MapPinIcon,
  CalendarIcon,
  ArrowRightIcon,
  ChevronDownIcon, // Added for the dropdown look
} from "@heroicons/react/24/outline";

// Define the content for the Budget options
const budgetOptions = [
  {
    name: "Cheap",
    icon: "💵",
    description: "Stay conscious of costs",
    color: "green",
  },
  {
    name: "Moderate",
    icon: "💰",
    description: "Keep cost on the average side",
    color: "yellow",
  },
  {
    name: "Luxury",
    icon: "🥂",
    description: "Don't worry about cost",
    color: "purple",
  },
];

// Define the content for the Traveler options
const travelerOptions = [
  {
    name: "Just Me",
    icon: "✈️",
    description: "A sole traveler in exploration",
    color: "blue",
  },
  {
    name: "A Couple",
    icon: "🥂",
    description: "Two travelers in tandem",
    color: "pink",
  },
  {
    name: "Family",
    icon: "🏡",
    description: "A group of fun loving adv...",
    color: "red",
  },
  {
    name: "Friends",
    icon: "👯",
    description: "Shared adventures and memories",
    color: "indigo",
  },
];

const CreateTrip = () => {
  const [destination, setDestination] = useState("New York, NY, USA"); // Pre-filled to match image
  const [days, setDays] = useState("3"); // Pre-filled to match image
  const [budget, setBudget] = useState("Cheap"); // Selected to match image
  const [traveler, setTraveler] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/plan-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          days: Number(days),
          budget,
          travelers: traveler,
        }),
      });
      const data = await response.json();
      if (data.ok) setItinerary(data.itinerary);
      else setError(data.message || "Failed to generate itinerary");
    } catch (err) {
      console.error(err);
      setError("Error connecting to backend");
    }
    setLoading(false);
  };

  const getDayOptions = () => {
    return Array.from({ length: 14 }, (_, i) => i + 1); // 1 to 14 days
  };

  // Helper function to map color names to Tailwind classes
  const colorClasses = {
    green: {
      bg: "bg-green-100",
      border: "border-green-400",
      ring: "ring-green-400",
      text: "text-green-700",
      selectedBg: "bg-green-600",
      selectedBorder: "border-green-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      ring: "ring-yellow-400",
      text: "text-yellow-700",
      selectedBg: "bg-yellow-600",
      selectedBorder: "border-yellow-600",
    },
    purple: {
      bg: "bg-purple-100",
      border: "border-purple-400",
      ring: "ring-purple-400",
      text: "text-purple-700",
      selectedBg: "bg-purple-600",
      selectedBorder: "border-purple-600",
    },
    blue: {
      bg: "bg-blue-100",
      border: "border-blue-400",
      ring: "ring-blue-400",
      text: "text-blue-700",
      selectedBg: "bg-blue-600",
      selectedBorder: "border-blue-600",
    },
    pink: {
      bg: "bg-pink-100",
      border: "border-pink-400",
      ring: "ring-pink-400",
      text: "text-pink-700",
      selectedBg: "bg-pink-600",
      selectedBorder: "border-pink-600",
    },
    red: {
      bg: "bg-red-100",
      border: "border-red-400",
      ring: "ring-red-400",
      text: "text-red-700",
      selectedBg: "bg-red-600",
      selectedBorder: "border-red-600",
    },
    indigo: {
      bg: "bg-indigo-100",
      border: "border-indigo-400",
      ring: "ring-indigo-400",
      text: "text-indigo-700",
      selectedBg: "bg-indigo-600",
      selectedBorder: "border-indigo-600",
    },
  };

  // --- Helper components for reusability and clarity ---

  const QuestionTitle = ({ icon: Icon, children }) => (
    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
      <Icon className="w-6 h-6 text-blue-500" />
      {children}
    </h3>
  );

  const SectionTitle = ({ children }) => (
    <h4 className="text-lg font-medium text-gray-600 mb-2">{children}</h4>
  );

  const SelectInput = ({ value, onChange, placeholder, options }) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none w-full border border-gray-300 bg-white rounded-xl p-3 pr-10 text-gray-800 font-medium cursor-pointer focus:ring-2 focus:ring-blue-400 outline-none transition duration-200 shadow-sm"
        required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
    </div>
  );

  const GridButton = ({
    selected,
    option,
    onClick,
    icon,
    description,
    colorKey,
    isBudget,
  }) => {
    const classes = colorClasses[colorKey];
    const isSelected = selected === option;

    return (
      <button
        type="button"
        onClick={() => onClick(option)}
        className={`flex flex-col items-start text-left border-2 rounded-2xl p-4 text-sm font-medium transition duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] ${
          isSelected
            ? `${classes.selectedBg} text-white ${classes.selectedBorder} border-4`
            : `border-gray-200 bg-white hover:${classes.bg} text-gray-700`
        } ${isBudget ? "col-span-1" : "col-span-1"}`} // Adjusting grid span for traveler for a more condensed look
      >
        <div className={`text-3xl mb-1 ${isSelected ? "text-white" : ""}`}>
          {icon}
        </div>
        <div
          className={`font-bold ${isSelected ? "text-white" : "text-gray-900"}`}
        >
          {option}
        </div>
        <div
          className={`mt-1 text-xs ${
            isSelected ? "text-white/80" : "text-gray-500"
          }`}
        >
          {description}
        </div>
      </button>
    );
  };

  // --- Main Component Render ---
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-800 flex items-center justify-center gap-3">
          ✨ Plan Your Perfect Trip
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Destination */}
          <div className="space-y-4">
            <QuestionTitle icon={MapPinIcon}>
              What is destination of choice?
            </QuestionTitle>
            <SelectInput
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Select a destination"
              options={[
                "New York, NY, USA",
                "Paris, France",
                "Tokyo, Japan",
                "London, UK",
              ]} // Example list
            />
          </div>

          <hr className="border-t border-gray-100" />

          {/* Days */}
          <div className="space-y-4">
            <QuestionTitle icon={CalendarIcon}>
              How many days are you planning your trip?
            </QuestionTitle>
            <SelectInput
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="Select number of days"
              options={getDayOptions()}
            />
          </div>

          <hr className="border-t border-gray-100" />

          {/* Budget */}
          <div className="space-y-4">
            <QuestionTitle icon={() => <div className="text-xl">💳</div>}>
              What is Your Budget?
            </QuestionTitle>
            <div className="grid grid-cols-3 gap-5">
              {budgetOptions.map((option) => (
                <GridButton
                  key={option.name}
                  selected={budget}
                  option={option.name}
                  onClick={setBudget}
                  icon={option.icon}
                  description={option.description}
                  colorKey={option.color}
                  isBudget={true}
                />
              ))}
            </div>
          </div>

          <hr className="border-t border-gray-100" />

          {/* Traveler */}
          <div className="space-y-4">
            <QuestionTitle icon={() => <div className="text-xl">👥</div>}>
              Who do you plan on traveling with on your next adventure?
            </QuestionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {travelerOptions.map((option) => (
                <GridButton
                  key={option.name}
                  selected={traveler}
                  option={option.name}
                  onClick={setTraveler}
                  icon={option.icon}
                  description={option.description}
                  colorKey={option.color}
                  isBudget={false}
                />
              ))}
            </div>
          </div>

          <hr className="border-t border-gray-100" />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !destination || !days || !budget || !traveler}
            className={`w-full rounded-2xl py-4 text-lg font-bold transition duration-300 shadow-xl flex justify-center items-center gap-3 mt-10 ${
              loading || !destination || !days || !budget || !traveler
                ? "bg-blue-300 cursor-not-allowed text-white"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl"
            }`}
          >
            {loading ? "Planning your trip..." : "Generate Itinerary"}
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="mt-6 text-red-600 font-medium text-center bg-red-50 p-3 rounded-xl border border-red-300">
            ⚠️ {error}
          </p>
        )}

        {/* Itinerary Display - Using original structure for functionality */}
        {itinerary && (
          <div className="mt-10 space-y-6">
            <h3 className="text-3xl font-bold text-blue-700 border-b pb-3 mb-6">
              Your Generated Itinerary
            </h3>

            {/* Summary */}
            {itinerary.summary && (
              <div className="bg-blue-50 p-5 rounded-xl shadow-inner border-l-4 border-blue-400">
                <h3 className="text-xl font-bold mb-2 text-blue-700">
                  Trip Summary
                </h3>
                <p>{itinerary.summary}</p>
              </div>
            )}

            {/* Estimated cost */}
            {itinerary.estimated_cost && (
              <div className="bg-yellow-50 p-5 rounded-xl shadow-inner border-l-4 border-yellow-400">
                <h3 className="text-xl font-bold mb-2 text-yellow-700">
                  Estimated Cost
                </h3>
                <p>{itinerary.estimated_cost}</p>
              </div>
            )}

            {/* Transport suggestions */}
            {itinerary.transport_suggestions && (
              <div className="bg-green-50 p-5 rounded-xl shadow-inner border-l-4 border-green-400">
                <h3 className="text-xl font-bold mb-2 text-green-700">
                  Transport Suggestions
                </h3>
                <p>{itinerary.transport_suggestions}</p>
              </div>
            )}

            {/* Days */}
            {itinerary.days?.map((day) => (
              <div
                key={day.day}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition"
              >
                <h4 className="text-2xl font-bold mb-3 text-blue-600 border-b pb-2">
                  Day {day.day}: {day.title}
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold text-blue-500">
                      🌅 Morning:
                    </span>{" "}
                    {day.morning}
                  </p>
                  <p>
                    <span className="font-semibold text-orange-500">
                      🏙️ Afternoon:
                    </span>{" "}
                    {day.afternoon}
                  </p>
                  <p>
                    <span className="font-semibold text-purple-500">
                      🌙 Evening:
                    </span>{" "}
                    {day.evening}
                  </p>
                </div>
                {day.tips && (
                  <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                    <span className="font-bold text-gray-500">💡 Tip:</span>{" "}
                    {day.tips}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTrip;
