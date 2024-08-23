import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VoterReg = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    cnic: "45837-82634929-8",
    address: "",
    email: "youremail@gmail.com",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate the age based on the entered date of birth
    const today = new Date();
    const birthDate = new Date(formData.dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth date has not occurred this year yet
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // Validate age is between 18 and 110
    if (age < 18 || age > 110) {
      alert("Age must be between 18 and 110 years.");
      return;
    }

    // Handle form submission logic, such as sending data to the server
    console.log(formData);
    navigate("/success");
  };

  return (
    <div className="bg-[#262529] flex flex-col place-content-center items-center min-h-screen text-white px-40">
      <h1 className="text-3xl mb-6">Voter Registration</h1>
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

export default VoterReg;
