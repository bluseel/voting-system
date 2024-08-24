import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

const ConfirmParty = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate(`/successvote`); // Navigate to a different page based on the selected option
  };
  const handleClose = () => {
    navigate(`/selectparty`); // Navigate to a different page based on the selected option
  };

  return (
    <div className="bg-[#262529] flex flex-col place-content-center items-center min-h-screen text-white px-40">
      <h1 className="text-6xl text-center mb-12">Confirm Party</h1>

      <div className="w-full h-[60svh] flex flex-row-reverse items-center bg-[#2681BA] place-content-end  cursor-pointer ">
        <div className="relative "></div>
        <div className="w-full flex-[1]  text-6xl text-center ">
          (PPP) <br /> Pakistan Peoples Party
        </div>
        <div className="h-full flex-[1]  aspect-auto bg-white ">
          <img src="/ppp.png" alt="Party logo" className="w-full h-full" />
        </div>
      </div>

      <div className="flex w-full space-x-5 ">
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
