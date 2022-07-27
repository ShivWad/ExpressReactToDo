import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to={"/signup"}>signup</Link>
        <br/>
        <Link to={"/create"}>Create</Link>
    </div>

  )
}

export default Home