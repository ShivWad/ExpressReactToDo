import "./App.css";
// import NavBar from "./components/NavBar";
import TaskInput from "./components/TaskInput";
import {
  Routes,
  Route,
  Navigate,
  // useLocation,
  // HashRouter,
  BrowserRouter,
} from "react-router-dom";
import NewUser from "./components/NewUser";
import LoginUser from "./components/LoginUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";
import Home from "./components/Home";

const App = () => {
  // const location = useLocation();

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

  return (
    <>
      {/* <BrowserRouter> */}

      <div className="main-container">
        <SideBar />
        {/* {location.pathname === "/create" && <SideBar />} */}

        <div className="not-sidebar">
          {/* <BrowserRouter > */}
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/signup" element={<NewUser />} />
              <Route path="/create" element={<TaskInput />} />
              <Route path="/login" element={<LoginUser />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          {/* </BrowserRouter> */}
        </div>
      </div>
      {/* </BrowserRouter> */}
    </>
  );
};

export default App;
