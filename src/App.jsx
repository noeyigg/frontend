import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./components/Auth";
import Workspace from "./components/workspace";
import New from "./components/New";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/new" element={<New/>} />
      </Routes>
    </Router>
  );
}

export default App;
