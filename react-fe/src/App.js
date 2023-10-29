import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Posting, Profile } from "./components";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:name" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
