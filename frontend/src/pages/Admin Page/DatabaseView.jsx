import React, { useEffect, useState } from "react";
import apiURL from "../../../envfile";

const Database = () => {
  const [parties, setParties] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [votings, setVotings] = useState([]);

  useEffect(() => {
    // Fetch Parties
    fetch(`${apiURL}/api/parties`)
      .then((response) => response.json())
      .then((data) => setParties(data))
      .catch((error) => console.error("Error fetching parties:", error));

    // Fetch Candidates
    fetch(`${apiURL}/api/candidates`)
      .then((response) => response.json())
      .then((data) => setCandidates(data))
      .catch((error) => console.error("Error fetching candidates:", error));

    // Fetch Voters
    fetch(`${apiURL}/api/voters`)
      .then((response) => response.json())
      .then((data) => setVoters(data))
      .catch((error) => console.error("Error fetching voters:", error));

    // Fetch Votings
    fetch(`${apiURL}/api/votings`)
      .then((response) => response.json())
      .then((data) => setVotings(data))
      .catch((error) => console.error("Error fetching votings:", error));
  }, []);

  return (
    <div className="bg-[#262529] flex flex-col place-content-center items-center min-h-screen text-white px-40">
      <h1 className="text-6xl text-center mb-12">Database</h1>

      {/* All Votings Table */}
      <div className="w-full overflow-auto mb-12">
        <h2 className="text-4xl mb-6">All Votings</h2>
        <table className="w-full text-left text-white border-collapse border border-gray-600">
          <thead>
            <tr className="bg-[#1C7D37]">
              <th className="border border-gray-600 px-4 py-2">Party Name</th>
              <th className="border border-gray-600 px-4 py-2">Voter Name</th>
              <th className="border border-gray-600 px-4 py-2">Vote Time</th>
            </tr>
          </thead>
          <tbody>
            {votings.map((voting, index) => (
              <tr key={index} className="odd:bg-[#333] even:bg-[#444]">
                <td className="border border-gray-600 px-4 py-2">
                  {voting.partyName || "Unknown"}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {voting.cnicVoter || "Unknown"}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {new Date(voting.dateTimeOfVote).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Parties Table */}
      <div className="w-full overflow-auto mb-12">
        <h2 className="text-4xl mb-6">Parties</h2>
        <table className="w-full text-left text-white border-collapse border border-gray-600">
          <thead>
            <tr className="bg-[#1C7D37]">
              <th className="border border-gray-600 px-4 py-2">Party Name</th>
            </tr>
          </thead>
          <tbody>
            {parties.map((party, index) => (
              <tr key={index} className="odd:bg-[#333] even:bg-[#444]">
                <td className="border border-gray-600 px-4 py-2">
                  {party.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Candidates Table */}
      <div className="w-full overflow-auto mb-12">
        <h2 className="text-4xl mb-6">Candidates</h2>
        <table className="w-full text-left text-white border-collapse border border-gray-600">
          <thead>
            <tr className="bg-[#1C7D37]">
              <th className="border border-gray-600 px-4 py-2">
                Candidate Name
              </th>
              <th className="border border-gray-600 px-4 py-2">CNIC</th>
              <th className="border border-gray-600 px-4 py-2">Party</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index} className="odd:bg-[#333] even:bg-[#444]">
                <td className="border border-gray-600 px-4 py-2">
                  {candidate.fullname}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {candidate.cnic}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {candidate.partyId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Voters Table */}
      <div className="w-full overflow-auto mb-12">
        <h2 className="text-4xl mb-6">Voters</h2>
        <table className="w-full text-left text-white border-collapse border border-gray-600">
          <thead>
            <tr className="bg-[#1C7D37]">
              <th className="border border-gray-600 px-4 py-2">Voter Name</th>
              <th className="border border-gray-600 px-4 py-2">CNIC</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter, index) => (
              <tr key={index} className="odd:bg-[#333] even:bg-[#444]">
                <td className="border border-gray-600 px-4 py-2">
                  {voter.fullName}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {voter.cnic}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Database;
