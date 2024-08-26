import apiURL from "../envfile";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const PhaseContext = createContext();

// Create a provider component
export const PhaseProvider = ({ children }) => {
  const [phases, setPhases] = useState(() => {
    // Retrieve the phases from localStorage or set default values
    const savedPhases = localStorage.getItem("phases");
    return savedPhases
      ? JSON.parse(savedPhases)
      : {
          registration: "inProgress",
          voting: "notStarted",
          results: "notStarted",
        };
  });

  const [currentPhaseFromDB, setCurrentPhaseFromDB] = useState("registration");

  useEffect(() => {
    // Save phases to localStorage whenever they change
    localStorage.setItem("phases", JSON.stringify(phases));
  }, [phases]);

  // Determine the current phase
  const getCurrentPhase = () => {
    if (phases.registration === "inProgress") return "registration";
    if (phases.voting === "inProgress") return "voting";
    if (phases.results === "inProgress") return "results";
    return "done";
  };

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
  const restartEverything = async () => {
    try {
      const responseClearDB = await fetch(`${apiURL}/api/reset-everything/`, {
        method: "GET",
      });

      const data = await responseClearDB.json();
      console.log(data.message);
    } catch (error) {
      console.log("Error Deleting: ", error);
    }

    setPhases({
      registration: "inProgress",
      voting: "notStarted",
      results: "notStarted",
    });
  };

  // Update phase and get current phase from DB
  const currentPhase = getCurrentPhase();

  useEffect(() => {
    const updatePhase = async () => {
      try {
        const response = await fetch(`${apiURL}/api/update-phase/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPhase: currentPhase }), // Send the newPhase in the body
        });

        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.log("Error Updating Phase: ", error);
      }
    };

    const updateCurrentPhaseFromDB = async () => {
      try {
        const response = await fetch(
          `${process.env.APIURL}/api/current-phase/`
        );
        const dbPhase = await response.json();
        setCurrentPhaseFromDB(dbPhase.currentPhase); // Assuming dbPhase has a 'currentPhase' property
      } catch (error) {
        console.log("Error Fetching Current Phase: ", error);
      }
    };

    updatePhase();
    updateCurrentPhaseFromDB();
  }, [currentPhase]);

  return (
    <PhaseContext.Provider
      value={{ currentPhase: currentPhaseFromDB, nextPhase, restartEverything }}
    >
      {children}
    </PhaseContext.Provider>
  );
};

// Custom hook to use the PhaseContext
export const usePhase = () => {
  return useContext(PhaseContext);
};
