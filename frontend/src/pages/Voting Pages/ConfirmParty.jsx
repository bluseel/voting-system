import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmParty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { party } = location.state || {}; // Get the party data from the state

  const handleConfirm = () => {
    const cnicVoter = localStorage.getItem("cnicVoter");

    // Get current date and time
    const now = new Date();
    const todayDate = now.toLocaleDateString(); // Formats to "MM/DD/YYYY" or similar
    const todayTime = now.toLocaleTimeString(); // Formats to "HH:MM:SS AM/PM" or similar

    // Create the log message
    const logMessage = `<${cnicVoter}> voted for <${party.name}> on <${todayDate}> at <${todayTime}>`;

    // Console log the message
    console.log(logMessage);

    navigate(`/successvote`);
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
