import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessVote = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /live-results after 3 seconds
    const timer = setTimeout(() => {
      navigate("/live-results");
    }, 5000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-[#262529] flex flex-col place-content-center items-center min-h-screen text-white px-40">
      <h1 className="text-4xl mb-6">Vote Casted Succesfully!</h1>
      <div className="w-fit aspect-square flex place-content-center p-8 content-center rounded-full border-white border-4 mb-6">
        <img
          src="/checkgreen.svg" // Replace with the path to your checkmark image
          alt="Success"
          className="h-32 w-32 "
        />
      </div>
      <p className="text-xl mb-6">Your vote was submitted successfuly.</p>
      <p className="text-lg">Redirecting to live results...</p>
    </div>
  );
};

export default SuccessVote;
