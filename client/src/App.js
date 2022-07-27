import "./App.css";
import NavBar from "./components/NavBar";
import TaskInput from "./components/TaskInput";
import { Routes, Route, Link } from "react-router-dom";
import NewUser from "./components/NewUser";
import LoginUser from "./components/LoginUser";
import Home from "./components/Home";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<NewUser />} />
        <Route path="create" element={<TaskInput />} />
        <Route path="login" element={<LoginUser />} />
      </Routes>
    </>
  );
};

export default App;
