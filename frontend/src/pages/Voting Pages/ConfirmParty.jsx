import apiURL from "../../../envfile";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmParty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { party } = location.state || {}; // Get the party data from the state

  const handleConfirm = async () => {
    const cnicVoter = localStorage.getItem("cnicVoter");

    // Get current date and time
    const now = new Date();
    const dateTimeOfVote = now.toISOString(); // Formats to ISO 8601 string (e.g., "2024-08-26T12:00:00Z")

    try {
      // Send POST request to register the vote
      const response = await fetch(`${apiURL}/api/register-voting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cnicVoter,
          partyId: party.partyId, // Assuming party._id is the identifier for the party
          dateTimeOfVote,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Vote registered successfully:", result);
        navigate(`/successvote`);
      } else {
        console.error("Failed to register vote:", result.error);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error registering vote:", error);
      // Optionally, show an error message to the user
    }
  };

  const handleClose = () => {
    navigate(`/selectparty`);
  };

  return (
    <div className="bg-[#262529] flex flex-col place-content-center items-center min-h-screen text-white px-40">
      <h1 className="text-6xl text-center mb-12">Confirm Party</h1>

      {party ? (
        <div className="w-full h-[60svh] flex flex-row-reverse items-center bg-[#2681BA] place-content-end cursor-pointer">
          <div className="relative"></div>
          <div className="w-full flex-[1] text-6xl text-center">
            {party.name} <br /> {party.name}
          </div>
          <div className="h-full flex-[1] aspect-auto bg-white">
            <img
              src={party.imgUrl}
              alt={`${party.name} logo`}
              className="w-full h-full"
            />
          </div>
        </div>
      ) : (
        <div className="text-red-500 text-xl mt-4">No party selected.</div>
      )}

      <div className="flex w-full space-x-5">
        <button
          onClick={handleConfirm}
          className="mt-10 w-full bg-[#1C7D37] text-white px-6 py-4 rounded"
        >
          <img src="/check.svg" alt="Submit" className="h-10 w-full" />
        </button>
        <button
          onClick={handleClose}
          className="mt-10 w-full bg-[#7d1c1c] text-white px-6 py-4 rounded"
        >
          <img src="/cross.svg" alt="Submit" className="h-10 w-full" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmParty;
