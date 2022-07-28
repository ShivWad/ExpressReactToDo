import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'

const LoginUser = () => {
  const [userInfo, setUserInfo] = useState({
    userName: null,
    emailId: null,
    userPassword: null
  });

  const handleClick = () => {
  }

  return (
    <div className="signup-dialog">
      <TextField className='text-field-custom'
        label='Email Id' onChange={(e) => {
          setUserInfo(prevState => ({ ...userInfo, emailId: e.target.value }))
        }} />
      <TextField className='text-field-custom' type='password'
        label='Password' onChange={(e) => {
          setUserInfo(prevState => ({ ...userInfo, userPassword: e.target.value }))
        }} />

      <Button variant="contained"onClick={() => handleClick()}>Log In</Button>
      </div>
      )
}

      export default LoginUser