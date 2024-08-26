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
      const reponseClearDB = await fetch(
        `${process.env.APIURL}/api/reset-everything/`,
        {
          method: "POST",
        }
      );

      const data = await reponseClearDB.json();
      console.log(data.message);
    } catch (error) {
      console.log("Error Deleteing: ", error);
    }

    setPhases({
      registration: "inProgress",
      voting: "notStarted",
      results: "notStarted",
    });
  };

  // Get the current phase
  const currentPhase = getCurrentPhase();
  useEffect(() => {
    const updatePhase = async () => {
      try {
        const responseClearDB = await fetch(
          `${process.env.APIURL}/api/update-phase/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPhase: currentPhase }), // Send the newPhase in the body
          }
        );

        const data = await responseClearDB.json();
        console.log(data.message);
      } catch (error) {
        console.log("Error Updating Phase: ", error);
      }
    };

    updatePhase();
  }, [currentPhase]);

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
