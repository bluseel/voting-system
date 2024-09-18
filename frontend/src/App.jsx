import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LangSelect from "./pages/LangSelect";
import LiveResults from "./pages/LiveResults";
import Register from "./pages/Auth Pages/Register";
import Login from "./pages/Auth Pages/Login";
import OTP from "./pages/Auth Pages/OTP";
import ChoosingReg from "./pages/Registration Pages/ChoosingReg";
import CandidateReg from "./pages/Registration Pages/CandidateReg";
import VoterReg from "./pages/Registration Pages/VoterReg";
import Success from "./pages/Auth Pages/Success";
import SelectParty from "./pages/Voting Pages/SelectParty";
import ConfirmParty from "./pages/Voting Pages/ConfirmParty";
import SuccessVote from "./pages/Voting Pages/SuccessVote";

import AdminConsole from "./pages/Admin Page/AdminConsole";
import { PhaseProvider } from "./PhaseContext";
import CreateParty from "./pages/Admin Page/CreateParty";

function App() {
  return (
    <Router>
      <div>
        <PhaseProvider>
          <Routes>
{/*             <Route path="/" element={<LangSelect />} /> */}
            <Route path="/live-results" element={<LiveResults />} />
            <Route path="/" element={<LiveResults />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/registration" element={<ChoosingReg />} />
            <Route path="/registration/candidate" element={<CandidateReg />} />
            <Route path="/registration/voter" element={<VoterReg />} />
            <Route path="/success" element={<Success />} />
            <Route path="/selectparty" element={<SelectParty />} />
            <Route
              path="/selectparty/confirmparty"
              element={<ConfirmParty />}
            />
            <Route path="/successvote" element={<SuccessVote />} />
            <Route path="/admin" element={<AdminConsole />} />
            <Route path="/createnewparty" element={<CreateParty />} />
          </Routes>
        </PhaseProvider>
      </div>
    </Router>
  );
}

export default App;
