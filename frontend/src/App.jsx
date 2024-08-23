import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LangSelect from "./pages/LangSelect";
import LiveResults from "./pages/LiveResults";
import Login from "./pages/Auth Pages/Login";
import OTP from "./pages/Auth Pages/OTP";
import ChoosingReg from "./pages/Registration Pages/ChoosingReg";
import CandidateReg from "./pages/Registration Pages/CandidateReg";
import VoterReg from "./pages/Registration Pages/VoterReg";
import Success from "./pages/Auth Pages/Success";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LangSelect />} />
          <Route path="/live-results" element={<LiveResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/registration" element={<ChoosingReg />} />
          <Route path="/registration/candidate" element={<CandidateReg />} />
          <Route path="/registration/voter" element={<VoterReg />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
