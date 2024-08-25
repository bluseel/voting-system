import { usePhase } from "../../PhaseContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [otp, setOTP] = useState("");
  const [correctOTP, setCorrectOTP] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currentPhase } = usePhase();

  useEffect(() => {
    const storedOTP = localStorage.getItem("otp");
    if (storedOTP) {
      setCorrectOTP(storedOTP);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    if (otp !== correctOTP) {
      setError("Incorrect OTP. Please try again.");
      return;
    }

    setError(""); // Clear error if OTP is correct
    {
      currentPhase === "registration"
        ? navigate("/registration")
        : navigate("/selectparty");
      // registration for new signup
      // select party for voters
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full mt-10 bg-[#1C7D37] text-white px-6 py-4 rounded"
          >
            <img src="/check.svg" alt="Check" className="h-10 w-full" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTP;
