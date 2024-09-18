import apiURL from "../../../envfile";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateParty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    partyName: "",
    partyLogo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.partyName || !formData.partyLogo) {
      alert("Please provide both a party name and a logo.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("partyName", formData.partyName);
    formDataToSend.append("sampleFile", formData.partyLogo);

    try {
      // Upload logo
      const uploadResponse = await fetch(`${apiURL}/api/upload-logo`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload logo");
        console.log(uploadResponse);
      }

      const uploadResult = await uploadResponse.json();
      const logoUrl = await uploadResult.link;

      // Save party details to MongoDB
      const partyData = {
        partyName: formData.partyName,
        logoUrl: logoUrl,
      };

      const partyResponse = await fetch(`${apiURL}/api/create-party`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partyData),
      });

      if (!partyResponse.ok) {
        throw new Error("Failed to create party");
      }

      console.log("Party created successfully");
      navigate("/success");
    } catch (error) {
      console.error("Error creating party:", error);
    }
  };

  return (
    <div className="bg-[#262529] flex flex-col place-content-center items-center min-h-screen text-white px-40">
      <h1 className="text-3xl mb-6">Create New Party</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="partyName" className="block mb-2">
            Party Name
          </label>
          <input
            type="text"
            name="partyName"
            id="partyName"
            value={formData.partyName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#3b3a42] text-white border border-gray-600 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="partyLogo" className="block mb-2">
            Party Logo
          </label>
          <input
            type="file"
            name="partyLogo"
            id="partyLogo"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#3b3a42] text-white border border-gray-600 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#4a4a4e] hover:opacity-80 active:bg-[#414144] text-white font-bold rounded-md hover:bg-[#5a5a5e] transition duration-200"
        >
          Create Party
        </button>
      </form>
    </div>
  );
};

export default CreateParty;
