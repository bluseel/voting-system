import React from "react";
import { useNavigate } from "react-router-dom";

const LiveResults = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/login");
  };
  const parts = [
    {
      logo: "🔧", // Replace with actual image or logo
      name: "Party A",
      votes: 120,
    },
    {
      logo: "🔩",
      name: "Party B",
      votes: 95,
    },
    {
      logo: "⚙️",
      name: "Party C",
      votes: 75,
    },
  ];

  // Sort parts by votes in descending order
  const sortedParts = [...parts].sort((a, b) => b.votes - a.votes);

  return (
    <div className="bg-[#262529] min-h-screen text-white px-10">
      <div className="text-5xl mb-6 text-center py-5">NA-209 Live Results</div>
      <div>
        {/* table */}
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-start w-[100px]">Logo</th>
              <th className="py-2 px-4 border text-start">Part Name</th>
              <th className="py-2 px-4 border text-start w-[100px]">Votes</th>
            </tr>
          </thead>
          <tbody>
            {sortedParts.map((part, index) => (
              <tr key={index} className="border">
                <td className="py-2 px-4 border">{part.logo}</td>
                <td className="py-2 px-4 border">{part.name}</td>
                <td className="py-2 px-4 border">{part.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* buttons */}
        <div>
          <button
            className="bg-[#1C7D37] px-5 py-2 mt-2 w-full font-bold"
            onClick={handleSubmit}
          >
            Caste Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveResults;
