import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to={"/signup"}>Signup</Link>
        <br/>
        <Link to={"/create"}>Create</Link>
        <br/>
        <Link to={"/login"}>Login</Link>
    </div>

  )
}

export default Home