import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

  const { isValid } = useSelector(state => state.user)
  
  const navigate = useNavigate();
  useEffect(() => {
    if (isValid) {
      navigate('/create');
    }
  }, [])

  return (
    <div>
      <Link to={"/signup"}>Signup</Link>
      <br />
      <Link to={"/create"}>Create</Link>
      <br />
      <Link to={"/login"}>Login</Link>
    </div>

  )
}

export default Home