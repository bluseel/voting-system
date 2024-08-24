import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate CNIC length
    if (cnic.replace(/-/g, "").length !== 13) {
      alert("CNIC must be exactly 13 digits.");
      return;
    }
    console.log("CNIC:", cnic);
    console.log("Email:", email);
    localStorage.setItem("cnic", cnic);
    localStorage.setItem("email", email);

    // Generate OTP
    const otp = generateOtp();
    console.log(otp);
    localStorage.setItem("otp", otp);

    try {
      // Send OTP to backend
      // http://localhost:5000/api/send-email
      // https://voting-backend-delta.vercel.app/api/send-email
      const response = await fetch(
        "https://voting-backend-delta.vercel.app/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (!response.ok) {
        throw new Error("Email sending failed.");
      }

      console.log("Email sent");
      navigate("/otp");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const formatCnic = (value) => {
    // Remove non-digit characters
    value = value.replace(/\D/g, "");
    // Format the CNIC
    if (value.length > 13) value = value.slice(0, 13); // Limit to 13 digits
    if (value.length <= 5) return value;
    if (value.length <= 12) return `${value.slice(0, 5)}-${value.slice(5)}`;
    return `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12)}`;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setCnic(formatCnic(value));
  };

  return (
    <div className="bg-[#262529] flex place-content-center items-center min-h-screen text-white px-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-5 mx-auto p-4"
      >
        <div>
          <label
            htmlFor="cnic"
            className="block text-5xl font-medium leading-normal"
          >
            Enter Your CNIC
          </label>
          <input
            type="text"
            id="cnic"
            value={cnic}
            onChange={handleChange}
            maxLength="15" // Prevent entering more than 15 characters
            className="bg-black mt-1 px-4 py-2 block w-full text-6xl border-gray-300 rounded-md shadow-sm"
            placeholder="XXXXX-XXXXXXX-X"
            required
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block font-medium text-5xl leading-normal"
          >
            Enter your Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black mt-1 flex px-4 py-2 text-6xl w-full border-gray-300 rounded-md shadow-sm"
            placeholder="yourmail@email.com"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full mt-10 bg-[#1C7D37] text-white px-6 py-4 rounded"
          >
            <img src="/check.svg" alt="" className="h-10 w-full" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
