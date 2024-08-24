import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

const ChoosingReg = () => {
  const [selectedOption, setSelectedOption] = useState("candidate");
  const navigate = useNavigate();

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    console.log("Selected option:", selectedOption);
    // Navigate to a different route based on the selection
    if (selectedOption === "candidate") {
      navigate("candidate");
    } else {
      navigate("voter");
    }
  };

  return (
    <div className="bg-[#262529] flex flex-col place-content-center items-center min-h-screen text-white px-40">
      <h1 className="text-6xl text-center mb-12">
        How do you want to register?
      </h1>
      <RadioGroup
        value={selectedOption}
        onValueChange={handleOptionChange}
        className="w-full"
      >
        <Label
          htmlFor="option-candidate"
          className="w-full flex flex-row-reverse items-center space-x-2 bg-[#2681BA] h-16 place-content-end py-14 cursor-pointer px-10"
        >
          <div className="relative ">
            <RadioGroupItem
              value="candidate"
              id="option-candidate"
              className="scale-[2] absolute -top-1 -left-5 "
            />
          </div>
          <div>
            <div className="text-5xl pr-10">Candidate</div>
          </div>
        </Label>

        <Label
          htmlFor="option-voter"
          className="flex flex-row-reverse items-center space-x-2 bg-[#2681BA] h-16 place-content-end py-14 cursor-pointer px-10"
        >
          <div className="relative">
            <RadioGroupItem
              value="voter"
              id="option-voter"
              className="scale-[2] absolute -top-1 -left-5 accent-blue-500"
            />
          </div>
          <div>
            <div className="text-5xl pr-10">Voter</div>
          </div>
        </Label>
      </RadioGroup>

      <button
        onClick={handleSubmit}
        className="mt-10 w-full bg-[#1C7D37] text-white px-6 py-4 rounded"
      >
        <img src="/check.svg" alt="" className="h-10 w-full" />
      </button>
    </div>
  );
};

export default ChoosingReg;
