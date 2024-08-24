import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

const SelectParty = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Initially empty to capture the user's selection
  const [error, setError] = useState(""); // State for handling errors
  const navigate = useNavigate();

  const handleOptionChange = (value) => {
    setSelectedOption(value); // Updates the selectedOption state with the selected value
    setError(""); // Clear error when a valid option is selected
  };

  const handleSubmit = () => {
    if (selectedOption) {
      navigate(`/selectparty/${selectedOption}/confirmparty`); // Navigate to a different page based on the selected option
    } else {
      setError("Please select a party before proceeding."); // Set error message if no party is selected
    }
  };

  return (
    <div className="bg-[#262529] flex flex-col place-content-center items-center min-h-screen text-white px-40">
      <h1 className="text-6xl text-center mb-12">Select Party</h1>

      <RadioGroup
        value={selectedOption} // Bind the RadioGroup value to the selectedOption state
        onValueChange={handleOptionChange}
        className="w-full grid grid-cols-2"
      >
        {[1, 2, 3, 4, 6, 7].map((item) => (
          <Label
            key={item}
            htmlFor={item.toString()} // Ensure the id is a string
            className="w-full flex flex-row-reverse items-center space-x-2 bg-[#2681BA] h-16 place-content-end py-14 cursor-pointer px-10"
          >
            <div className="relative ">
              <RadioGroupItem
                value={item.toString()} // Bind the value to the actual item number as a string
                id={item.toString()} // Ensure the id is a string
                className="scale-[2] absolute -top-1 -left-5 "
              />
            </div>
            <div>
              <div className="text-2xl pr-10">(PPP) Pakistan Peoples Party</div>
            </div>
            <div className="h-20 w-24 aspect-auto bg-white p-2">
              <img src="/ppp.png" alt="Party logo" className="w-full h-full" />
            </div>
          </Label>
        ))}
      </RadioGroup>

      {error && <div className="text-red-500 text-xl mt-4">{error}</div>}

      <button
        onClick={handleSubmit}
        className="mt-10 w-full bg-[#1C7D37] text-white px-6 py-4 rounded"
      >
        <img src="/check.svg" alt="Submit" className="h-10 w-full" />
      </button>
    </div>
  );
};

export default SelectParty;
