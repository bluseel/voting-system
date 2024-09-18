import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePhase } from "../PhaseContext";
import apiURL from "../../envfile";

const LiveResults = () => {
  const [parties, setParties] = useState([]);
  const [votes, setVotes] = useState({});
  const navigate = useNavigate();

  const { currentPhase } = usePhase();

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await fetch(`${apiURL}/api/parties`);
        const data = await response.json();
        setParties(data);
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    };

    const fetchVotes = async () => {
      try {
        const response = await fetch(`${apiURL}/api/live-votes`);
        const data = await response.json();
        const voteMap = data.reduce((map, party) => {
          map[party.partyId] = party.voteCount;
          return map;
        }, {});
        setVotes(voteMap);
      } catch (error) {
        console.error("Error fetching live votes:", error);
      }
    };

    fetchParties();
    fetchVotes();
  }, []);

  const handleSubmit = () => {
    currentPhase === "registration"
      ? navigate("/register")
      : navigate("/login");
  };

  // Sort parties by votes in descending order
  const sortedParties = [...parties]
    .sort((a, b) => (votes[a.partyId] || 0) - (votes[b.partyId] || 0))
    .reverse();

  return (
    <div className="bg-[#262529] min-h-screen text-center text-white px-10">
      {currentPhase === "done" ? (
        <div className="min-h-screen text-5xl w-full flex place-content-center items-center">
          The system is offline. <br /> Contact Polling Agent
        </div>
      ) : (
        <div className="bg-[#262529] min-h-screen text-white px-10">
          <div className="text-5xl mb-6 text-center py-5">
            NA-209 Live Results
          </div>
          <div>
            {/* table */}
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border text-start w-[100px]">
                    Logo
                  </th>
                  <th className="py-2 px-4 border text-start">Party Name</th>
                  <th className="py-2 px-4 border text-start w-[100px]">
                    Votes
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedParties.map((party) => (
                  <tr key={party.partyId} className="border">
                    <td className="py-2 px-4 border">
                      <img
                        src={party.imgUrl}
                        alt={party.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 border">{party.name}</td>
                    <td className="py-2 px-4 border">
                      {votes[party.partyId] || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* buttons */}
            <div>
              {currentPhase === "results" || currentPhase === "done" ? (
                "The final results are in"
              ) : (
                <button
                  className="bg-[#1C7D37] px-5 py-2 mt-2 w-full font-bold hover:opacity-80 active:bg-[#0a2b13]"
                  onClick={handleSubmit}
                >
                  {currentPhase === "registration"
                    ? "Register Now"
                    : "Cast Your Vote"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveResults;
