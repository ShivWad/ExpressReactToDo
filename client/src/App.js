import "./App.css";
import NavBar from "./components/NavBar";
import TaskInput from "./components/TaskInput";
import { Routes, Route, Link } from "react-router-dom";
import NewUser from "./components/NewUser";
const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route path="signup" element={<NewUser />} />
        <Route path="create" element={<TaskInput />} />
      </Routes>
    </>
  );
};

export default App;
