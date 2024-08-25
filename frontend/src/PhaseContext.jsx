import React, { createContext, useState, useContext } from "react";

// Create the context
const PhaseContext = createContext();

// Create a provider component
export const PhaseProvider = ({ children }) => {
  const [phases, setPhases] = useState({
    registration: "inProgress",
    voting: "notStarted",
    results: "notStarted",
  });

  // Function to move to the next phase
  const nextPhase = () => {
    if (phases.registration === "inProgress") {
      setPhases({
        registration: "done",
        voting: "inProgress",
        results: "notStarted",
      });
    } else if (phases.voting === "inProgress") {
      setPhases({
        registration: "done",
        voting: "done",
        results: "inProgress",
      });
    } else if (phases.results === "inProgress") {
      setPhases({
        registration: "done",
        voting: "done",
        results: "done",
      });
    }
  };

  // Function to restart everything
  const restartEverything = () => {
    setPhases({
      registration: "inProgress",
      voting: "notStarted",
      results: "notStarted",
    });
  };

  return (
    <PhaseContext.Provider value={{ phases, nextPhase, restartEverything }}>
      {children}
    </PhaseContext.Provider>
  );
};

// Custom hook to use the PhaseContext
export const usePhase = () => {
  return useContext(PhaseContext);
};
