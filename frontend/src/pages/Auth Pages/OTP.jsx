import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate OTP length
    if (otp.length !== 6) {
      alert("OTP must be exactly 6 digits.");
      return;
    }
    console.log("OTP:", otp);
    navigate("/registration");
    // Proceed with the next steps, e.g., verification
  };

  const handleChange = (e) => {
    const { value } = e.target;
    // Allow only digits and limit to 6 characters
    const formattedValue = value.replace(/\D/g, "").slice(0, 6);
    setOTP(formattedValue);
  };

  return (
    <div className="bg-[#262529] flex place-content-center items-center min-h-screen text-white px-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-5 mx-auto p-4"
      >
        <div>
          <label
            htmlFor="otp"
            className="block text-5xl font-medium leading-normal"
          >
            Enter OTP sent on your email
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleChange}
            maxLength="6"
            className="bg-black mt-1 px-4 py-2 block w-full text-6xl border-gray-300 rounded-md shadow-sm"
            placeholder="XXXXXX"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full mt-10 bg-[#1C7D37] text-white px-6 py-4 rounded"
          >
            <img src="/public/check.svg" alt="" className="h-10 w-full" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTP;
