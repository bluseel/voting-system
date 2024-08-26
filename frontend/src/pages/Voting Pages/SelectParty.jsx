import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import apiURL from "../../../envfile";

const SelectParty = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Initially empty to capture the user's selection
  const [error, setError] = useState(""); // State for handling errors
  const [parties, setParties] = useState([]); // State to store parties data
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiURL}/api/parties`)
      .then((response) => response.json())
      .then((data) => {
        setParties(data); // Update state with the fetched parties data
      })
      .catch((err) => {
        console.error("Failed to fetch parties:", err);
        setError("Failed to load parties. Please try again later.");
      });
  }, []);

  const handleOptionChange = (value) => {
    setSelectedOption(value); // Updates the selectedOption state with the selected value
    setError(""); // Clear error when a valid option is selected
  };

  const handleSubmit = () => {
    if (selectedOption) {
      // Find the selected party from the parties array
      const selectedParty = parties.find(
        (party) => party.partyId.toString() === selectedOption
      );

      // Navigate to ConfirmParty with the selected party as state
      navigate("/selectparty/confirmparty", {
        state: { party: selectedParty },
      });
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
        {parties.map((party) => (
          <Label
            key={party.partyId}
            htmlFor={party.partyId.toString()} // Ensure the id is a string
            className="w-full flex gap-6 flex-row-reverse items-center bg-[#2681BA] h-16 place-content-end py-14 cursor-pointer px-10"
          >
            <div className="relative">
              <RadioGroupItem
                value={party.partyId.toString()} // Bind the value to the partyId as a string
                id={party.partyId.toString()} // Ensure the id is a string
                className="scale-[2] absolute -top-1 -left-2"
              />
            </div>
            <div className="h-20 w-24 aspect-auto bg-white p-1">
              <img
                src={party.imgUrl}
                alt={`${party.name} logo`}
                className="w-full h-full"
              />
            </div>
            <div>
              <div className="text-2xl">{party.name}</div>
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
