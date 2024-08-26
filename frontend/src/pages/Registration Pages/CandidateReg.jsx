import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiURL from "../../../envfile";

const CandidateReg = () => {
  const navigate = useNavigate();
  const cachedCnic = localStorage.getItem("cnic") || "45837-82634929-8";
  const cachedEmail = localStorage.getItem("email") || "youremail@gmail.com";

  const [formData, setFormData] = useState({
    cnic: cachedCnic,
    email: cachedEmail,
    partyId: "", // Updated to store partyId as string
    fullName: "",
    dob: "",
    address: "",
  });

  const [partyOptions, setPartyOptions] = useState([]);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await fetch(`${apiURL}/api/parties`);
        if (!response.ok) {
          throw new Error("Failed to fetch parties");
        }
        const data = await response.json();
        setPartyOptions(data); // Set fetched party data
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    };

    fetchParties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const birthDate = new Date(formData.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18 || age > 150) {
      alert("Age must be between 18 and 150 years.");
      return;
    }

    try {
      const response = await fetch(`${apiURL}api/createcandidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/success");
      } else {
        const errorData = await response.json();
        if (response.status === 410) {
          alert(`Error: ${errorData.error}`);
        } else {
          alert(`Error: ${errorData.error}`);
        }
      }
    } catch (error) {
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="bg-[#262529] flex flex-col justify-center items-center min-h-screen text-white px-6 md:px-40">
      <h1 className="text-3xl mb-6">Candidate Registration</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="fullName" className="block mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#3b3a42] text-white border border-gray-600 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#3b3a42] text-white border border-gray-600 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cnic" className="block mb-2">
            CNIC Number
          </label>
          <input
            type="text"
            name="cnic"
            id="cnic"
            value={formData.cnic}
            readOnly
            className="w-full px-4 py-2 bg-[#3b3a42] text-white border border-gray-600 rounded-md cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#3b3a42] text-white border border-gray-600 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-2 bg-[#3b3a42] text-white border border-gray-600 rounded-md cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="party" className="block mb-2">
            Party
          </label>
          <select
            name="partyId"
            id="party"
            value={formData.partyId}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#3b3a42] text-white border border-gray-600 rounded-md"
            required
          >
            <option value="" disabled>
              Select a party
            </option>
            {partyOptions.map((party) => (
              <option key={party.partyId} value={party.partyId}>
                {party.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#4a4a4e] text-white font-bold rounded-md hover:bg-[#5a5a5e] transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default CandidateReg;
