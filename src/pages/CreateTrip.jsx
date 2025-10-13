import React, { useState } from "react";

const CreateTrip = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
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

      if (data.ok) {
        setItinerary(data.itinerary);
      } else {
        setError(data.message || "Failed to generate itinerary");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          ✈️ Plan Your Next Adventure
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Destination */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Paris"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Days */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Number of Days</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="e.g. 5"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Budget</label>
            <div className="grid grid-cols-3 gap-3">
              {["Cheap", "Moderate", "Luxury"].map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setBudget(option)}
                  className={`border rounded-lg p-3 text-sm font-medium transition ${
                    budget === option
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Traveler */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Traveler Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Just Me", "A Couple", "Family", "Friends"].map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setTraveler(option)}
                  className={`border rounded-lg p-3 text-sm font-medium transition ${
                    traveler === option
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !budget || !traveler}
            className={`w-full rounded-lg py-3 font-semibold transition ${
              loading || !budget || !traveler
                ? "bg-blue-400 cursor-not-allowed text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Planning your trip..." : "Generate Itinerary"}
          </button>
        </form>

        {/* Error */}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {/* Itinerary Display */}
        {itinerary && (
          <div className="mt-8 space-y-6">
            {/* Summary */}
            {itinerary.summary && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold mb-2">Trip Summary</h3>
                <p>{itinerary.summary}</p>
              </div>
            )}

            {/* Estimated cost */}
            {itinerary.estimated_cost && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold mb-2">Estimated Cost</h3>
                <p>{itinerary.estimated_cost}</p>
              </div>
            )}

            {/* Transport suggestions */}
            {itinerary.transport_suggestions && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold mb-2">Transport Suggestions</h3>
                <p>{itinerary.transport_suggestions}</p>
              </div>
            )}

            {/* Days */}
            {itinerary.days?.map((day) => (
              <div
                key={day.day}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h4 className="text-lg font-bold mb-2">
                  Day {day.day}: {day.title}
                </h4>
                <p><span className="font-semibold">Morning:</span> {day.morning}</p>
                <p><span className="font-semibold">Afternoon:</span> {day.afternoon}</p>
                <p><span className="font-semibold">Evening:</span> {day.evening}</p>
                {day.tips && (
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Tip:</span> {day.tips}
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
