import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import SideBar from './SideBar'

const Home = () => {

  // const { isValid } = useSelector(state => state.user)
  const { isValid } = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (isValid) navigate("/create");
    else navigate('/login');
  }, []);
  

  return (
    <>

      {/* <SideBar/> */}
     
    </>


  )
}

export default Home