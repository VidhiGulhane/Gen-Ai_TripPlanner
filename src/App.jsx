import React, { useState } from "react"; // 👈 Import useState
import "./App.css";

// KEEP THESE IMPORTS - They correctly point to your files
import Header from "./components/ui/custom/Header";
import Hero from "./components/ui/custom/Hero";

// 👈 Import the new components
import CreateTrip from "./pages/CreateTrip";
// You may also want to import the OptionCard if it's used directly in the page components
// import OptionCard from "./components/OptionCard";

function App() {
  // State to manage which page is currently displayed
  // We'll use a simple string 'landing' or 'create-trip'
  const [currentPage, setCurrentPage] = useState("landing");

  // You would pass setCurrentPage to a button (like "Get Started")
  // on the Hero component to change the page.

  // --- Conditional Rendering Logic ---
  let content;

  if (currentPage === "landing") {
    // Landing Page Content
    content = (
      <>
        <Header />
        <main>
          {/* NOTE: You will need to modify the Hero component to call:
            onClick={() => setCurrentPage('create-trip')} 
            when the "Get Started, It's Free" button is clicked.
          */}
          <Hero setCurrentPage={setCurrentPage} />
        </main>
      </>
    );
  } else if (currentPage === "create-trip") {
    // Create Trip Page Content
    content = (
      <>
        {/* The Header component is usually present on all pages, including the form */}
        <Header />

        <main>
          {/* The new trip creation form */}
          <CreateTrip />
        </main>
      </>
    );
  }

  return <div className="min-h-screen bg-white">{content}</div>;
}

export default App;
