import React from "react";
import { usePhase } from "../../PhaseContext";
import { useNavigate } from "react-router-dom";

const AdminConsole = () => {
  const { phases, nextPhase, restartEverything } = usePhase();
  const navigate = useNavigate();

  // Function to handle "Create New Party" button click
  const handleCreateNewParty = () => {
    console.log("Creating a new party...");
    navigate("/createnewparty");
  };

  // Function to get the appropriate class based on phase status
  const getPhaseClass = (phase) => {
    switch (phase) {
      case "notStarted":
        return "bg-[#2681BA]";
      case "inProgress":
        return "bg-[#2681BA]";
      case "done":
        return "bg-[#1C7D37]";
      default:
        return "bg-[#2681BA]";
    }
  };

  return (
    <div className="bg-[#262529] flex flex-col place-content-center items-center min-h-screen text-white px-40">
      <h1 className="text-6xl text-center mb-12">Admin Console</h1>

      <div className="flex flex-col gap-4 w-full">
        {/* Registration Phase */}
        <div
          className={`w-full flex justify-between items-center space-x-2 h-16 place-content-start py-14 cursor-pointer px-10 ${getPhaseClass(
            phases.registration
          )}`}
        >
          <div className="text-5xl pr-10">Registration</div>
          {phases.registration === "inProgress" ? (
            <div className="w-10 h-10 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          ) : phases.registration === "done" ? (
            <div className="w-14 h-14 bg-[#1C7D37] flex place-content-center items-center rounded-full">
              <img src="/check.svg" alt="" className="h-10 w-10" />
            </div>
          ) : null}
        </div>

        {/* Voting Phase */}
        <div
          className={`w-full flex justify-between items-center space-x-2 h-16 place-content-start py-14 cursor-pointer px-10 ${getPhaseClass(
            phases.voting
          )}`}
        >
          <div className="text-5xl pr-10">Voting</div>
          {phases.voting === "inProgress" ? (
            <div className="w-10 h-10 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          ) : phases.voting === "done" ? (
            <div className="w-14 h-14 bg-[#1C7D37] flex place-content-center items-center rounded-full">
              <img src="/check.svg" alt="" className="h-10 w-10" />
            </div>
          ) : null}
        </div>

        {/* Results Phase */}
        <div
          className={`w-full flex justify-between items-center space-x-2 h-16 place-content-start py-14 cursor-pointer px-10 ${getPhaseClass(
            phases.results
          )}`}
        >
          <div className="text-5xl pr-10">Results</div>
          {phases.results === "inProgress" ? (
            <div className="w-10 h-10 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          ) : phases.results === "done" ? (
            <div className="w-14 h-14 bg-[#1C7D37] flex place-content-center items-center rounded-full">
              <img src="/check.svg" alt="" className="h-10 w-10" />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex w-full gap-2">
        {/* Create New Party Button */}
        <button
          onClick={handleCreateNewParty}
          className="mt-10 w-full bg-[#1C7D37] text-white px-6 py-4 rounded text-2xl"
        >
          Create New Party
        </button>

        {/* Restart Everything Button */}
        <button
          onClick={restartEverything}
          className="mt-10 w-full bg-[#1C7D37] text-white px-6 py-4 rounded text-2xl"
        >
          Restart Everything
        </button>

        {/* Next Phase Button */}
        <button
          onClick={nextPhase}
          className="mt-10 w-full bg-[#1C7D37] text-white px-6 py-4 rounded text-2xl"
        >
          Next Phase
        </button>
      </div>
    </div>
  );
};

export default AdminConsole;
