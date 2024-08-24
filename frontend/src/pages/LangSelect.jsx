import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

const LangSelect = () => {
  const [selectedOption, setSelectedOption] = useState("en");
  const navigate = useNavigate();

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    console.log("Selected option:", selectedOption);
    navigate("/live-results");
  };

  return (
    <div className="flex flex-col px-40 h-screen place-content-center text-white accent-white">
      <RadioGroup value={selectedOption} onValueChange={handleOptionChange}>
        <Label
          htmlFor="option-one"
          className="flex flex-row-reverse items-center space-x-2 bg-[#2681BA] h-16 place-content-end py-14 cursor-pointer px-10"
        >
          <div className="relative">
            <RadioGroupItem
              value="en"
              id="option-one"
              className="scale-[2] absolute -top-1 -left-5"
            />
          </div>
          <div>
            <div className="text-5xl pr-10">English</div>
          </div>
        </Label>

        <Label
          htmlFor="option-two"
          className="flex flex-row-reverse items-center space-x-2 bg-[#2681BA] h-16 place-content-end py-14 cursor-pointer px-10"
        >
          <div className="relative">
            <RadioGroupItem
              value="ur"
              id="option-two"
              className="scale-[2] absolute -top-1 -left-5 accent-blue-500"
            />
          </div>
          <div>
            <div className="text-5xl pr-10">اردو</div>
          </div>
        </Label>

        <Label
          htmlFor="option-three"
          className="flex flex-row-reverse items-center space-x-2 bg-[#2681BA] h-16 place-content-end py-14 cursor-pointer px-10"
        >
          <div className="relative">
            <RadioGroupItem
              value="sd"
              id="option-three"
              className="scale-[2] absolute -top-1 -right-0"
            />
          </div>
          <div>
            <div className="text-5xl pr-10">سنڌي</div>
          </div>
        </Label>
      </RadioGroup>

      <button
        onClick={handleSubmit}
        className="mt-10 bg-[#1C7D37] text-white px-6 py-4 rounded"
      >
        <img src="/public/check.svg" alt="" className="h-10 w-full" />
      </button>
    </div>
  );
};

export default LangSelect;
