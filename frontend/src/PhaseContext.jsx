import React, { createContext, useState, useContext, useEffect } from "react";
import apiURL from "../envfile";

// Create the context
const PhaseContext = createContext();

// Create a provider component
export const PhaseProvider = ({ children }) => {
  const [currentPhase, setCurrentPhase] = useState("registration"); // Default phase

  // Function to fetch the current phase from the database
  const fetchCurrentPhaseFromDB = async () => {
    try {
      const response = await fetch(`${apiURL}/api/current-phase/`);
      const data = await response.json();
      setCurrentPhase(data.currentPhase || "registration"); // Fallback to "registration" if no phase is returned
    } catch (error) {
      console.error("Error fetching current phase from DB:", error);
    }
  };

  // Function to update the current phase in the database
  const updatePhaseInDB = async (newPhase) => {
    try {
      const response = await fetch(`${apiURL}/api/update-phase/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPhase }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error updating phase in DB:", error);
    }
  };

  // Function to move to the next phase
  const nextPhase = () => {
    let newPhase = currentPhase;
    if (currentPhase === "registration") {
      newPhase = "voting";
    } else if (currentPhase === "voting") {
      newPhase = "results";
    } else if (currentPhase === "results") {
      newPhase = "done";
    }

    setCurrentPhase(newPhase);
    updatePhaseInDB(newPhase); // Update the phase in the database
  };

  // Function to restart everything
  const restartEverything = async () => {
    try {
      const responseClearDB = await fetch(`${apiURL}/api/reset-everything/`, {
        method: "GET",
      });
      const data = await responseClearDB.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error resetting everything:", error);
    }

    const initialPhase = "registration";
    setCurrentPhase(initialPhase);
    updatePhaseInDB(initialPhase); // Reset the phase in the database
  };

  // Fetch the current phase from the database when the component mounts
  useEffect(() => {
    fetchCurrentPhaseFromDB();
  }, []);

  return (
    <PhaseContext.Provider
      value={{ currentPhase, nextPhase, restartEverything }}
    >
      {children}
    </PhaseContext.Provider>
  );
};

// Custom hook to use the PhaseContext
export const usePhase = () => {
  return useContext(PhaseContext);
};
