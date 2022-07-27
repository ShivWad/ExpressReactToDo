import { TextField, Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'

const createUserUrl = "http://localhost:8080/api/user/createUser"

const NewUser = () => {
  const [userInfo, setUserInfo] = useState({
    userName: null,
    emailId: null,
    userPassword: null
  });

  // const [errorObj, setErrorObj] = useState({
  //   userNameErr: false,
  //   emailIdErr: false,
  //   userPasswordErr: false
  // });



  // console.log([userInfo.userPassword.length,
  // userInfo.userName.length,
  // userInfo.emailId.length])


  const handleSubmit = async () => {
    // const
    console.log(userInfo)
  }

  // useEffect(() => {


  // }, [userInfo])


  return (
    <div className="signup-dialog">
      <TextField className='text-field-custom'
        label='User Name' onChange={(e) => {
          setUserInfo(prevState => ({ ...userInfo, userName: e.target.value }))
        }} />
      <TextField className='text-field-custom'
        label='Email Id' onChange={(e) => {
          setUserInfo(prevState => ({ ...userInfo, emailId: e.target.value }))
        }} />
      <TextField className='text-field-custom' type='password'
        label='Password' onChange={(e) => {
          setUserInfo(prevState => ({ ...userInfo, userPassword: e.target.value }))
        }} />

      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default NewUser