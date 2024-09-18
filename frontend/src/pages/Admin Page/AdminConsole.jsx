import React, { useState, useEffect } from "react";
import { usePhase } from "../../PhaseContext";
import { useNavigate } from "react-router-dom";
import apiURL from "../../../envfile";

const AdminConsole = () => {
  const { currentPhase, nextPhase, restartEverything } = usePhase();
  const navigate = useNavigate();
  const [phaseClass, setPhaseClass] = useState({
    registration: "bg-[#2681BA]",
    voting: "bg-[#2681BA]",
    results: "bg-[#2681BA]",
  });

  // Function to handle "Create New Party" button click
  const handleCreateNewParty = () => {
    console.log("Creating a new party...");
    navigate("/createnewparty");
  };

  // Function to update the phase class based on the current phase
  const updatePhaseClass = () => {
    const newPhaseClass = {
      registration:
        currentPhase === "registration" ? "bg-[#2681BA]" : "bg-[#1C7D37]",
      voting:
        currentPhase === "voting"
          ? "bg-[#2681BA]"
          : currentPhase === "registration"
          ? "bg-[#2681BA]"
          : "bg-[#1C7D37]",
      results:
        currentPhase === "results"
          ? "bg-[#2681BA]"
          : currentPhase === "registration" || currentPhase === "voting"
          ? "bg-[#2681BA]"
          : "bg-[#1C7D37]",
    };
    setPhaseClass(newPhaseClass);
  };

  useEffect(() => {
    updatePhaseClass();
    console.log(currentPhase);
  }, [currentPhase]);

  return (
    <div className="bg-[#262529] flex flex-col place-content-center items-center min-h-screen text-white px-40">
      <h1 className="text-6xl text-center mb-12">Admin Console</h1>

      <div className="flex flex-col gap-4 w-full">
        {/* Registration Phase */}
        <div
          className={`w-full flex justify-between items-center space-x-2 h-16 place-content-start py-14 cursor-pointer px-10 ${phaseClass.registration}`}
        >
          <div className="text-5xl pr-10">Registration</div>
          {currentPhase === "registration" ? (
            <div className="w-10 h-10 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          ) : (
            currentPhase !== "registration" && (
              <div className="w-14 h-14 bg-[#1C7D37] flex place-content-center items-center rounded-full">
                <img src="/check.svg" alt="Completed" className="h-10 w-10" />
              </div>
            )
          )}
        </div>

        {/* Voting Phase */}
        <div
          className={`w-full flex justify-between items-center space-x-2 h-16 place-content-start py-14 cursor-pointer px-10 ${phaseClass.voting}`}
        >
          <div className="text-5xl pr-10">Voting</div>
          {currentPhase === "voting" ? (
            <div className="w-10 h-10 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          ) : (
            currentPhase !== "voting" &&
            currentPhase !== "registration" && (
              <div className="w-14 h-14 bg-[#1C7D37] flex place-content-center items-center rounded-full">
                <img src="/check.svg" alt="Completed" className="h-10 w-10" />
              </div>
            )
          )}
        </div>

        {/* Results Phase */}
        <div
          className={`w-full flex justify-between items-center space-x-2 h-16 place-content-start py-14 cursor-pointer px-10 ${phaseClass.results}`}
        >
          <div className="text-5xl pr-10">Results</div>
          {currentPhase === "results" ? (
            <div className="w-10 h-10 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          ) : (
            currentPhase !== "results" &&
            currentPhase !== "registration" &&
            currentPhase !== "voting" && (
              <div className="w-14 h-14 bg-[#1C7D37] flex place-content-center items-center rounded-full">
                <img src="/check.svg" alt="Completed" className="h-10 w-10" />
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex w-full gap-2">
        {/* Create New Party Button */}
        <button
          onClick={handleCreateNewParty}
          className="mt-10 w-full bg-[#1C7D37] hover:opacity-80 active:bg-[#0a2b13] text-white px-6 py-4 rounded text-2xl"
        >
          Create New Party
        </button>

        {/* Restart Everything Button */}
        <button
          onClick={restartEverything}
          className="mt-10 w-full bg-[#1C7D37] hover:opacity-80 active:bg-[#0a2b13] text-white px-6 py-4 rounded text-2xl"
        >
          Restart Everything
        </button>

        {/* Next Phase Button */}
        <button
          onClick={nextPhase}
          className="mt-10 w-full bg-[#1C7D37] hover:opacity-80 active:bg-[#0a2b13] text-white px-6 py-4 rounded text-2xl"
        >
          Next Phase
        </button>
      </div>
    </div>
  );
};

export default AdminConsole;
