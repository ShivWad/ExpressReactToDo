import "./App.css";
import NavBar from "./components/NavBar";
import TaskInput from "./components/TaskInput";
import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import NewUser from "./components/NewUser";
import LoginUser from "./components/LoginUser";
import Home from "./components/Home";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [loggedIn, setLoggedIn] = useState('');
  const handleLogIn = (value) => {
    setLoggedIn(value);
  };
  let navigate = useNavigate();
  
  useEffect(() => {
    navigate("/login");
  }, [loggedIn]);

  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<NewUser handleLogIn={handleLogIn} />} />
        <Route path="/create" element={<TaskInput />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
};

export default App;
