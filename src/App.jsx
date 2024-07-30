import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/Authcontext";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./components/Auth";
import Workspace from "./components/Workspace";
import New from "./components/New";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/workspace" element={<ProtectedRoute element={Workspace} />} />
          <Route path="/new" element={<ProtectedRoute element={New} />} />
          <Route path="/document/:id" element={<ProtectedRoute element={New} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
