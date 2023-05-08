// import Layout from "./Components/Layouts/Layout";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Home from "./Screens/Home";
import { createContext, useEffect, useState } from "react";

export const userData = createContext();

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    // localStorage.clear();
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
    }
  }, []);
  return (
    <>
      <userData.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </userData.Provider>
    </>
  );
}

export default App;
