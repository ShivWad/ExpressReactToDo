import "./App.css";
// import NavBar from "./components/NavBar";
import TaskInput from "./components/TaskInput";
import { Routes, Route, Navigate } from "react-router-dom";
import NewUser from "./components/NewUser";
import LoginUser from "./components/LoginUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";

const App = () => {
  const { isValid } = useSelector((state) => state.user);

  // const [loggedIn, setLoggedIn] = useState('');
  // const handleLogIn = (value) => {
  //   setLoggedIn(value);
  // };

  // let navigate = useNavigate();

  // useEffect(() => {
  //   if(){
  //       navigate("/create");
  //   }

  // }, [loggedIn]);

  const navigate = useNavigate();
  useEffect(() => {
    if (isValid) navigate("/create");
  }, []);

  return (
    <>
      {/* <BrowserRouter> */}

      <div className="main-container">
        <SideBar />

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/signup" element={<NewUser />} />
          <Route path="/create" element={<TaskInput />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {/* </BrowserRouter> */}
    </>
  );
};

export default App;
