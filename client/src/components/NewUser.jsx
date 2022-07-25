import { TextField, Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const createUserUrl = "http://localhost:8080/api/user/createUser"

const NewUser = () => {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    emailId: '',
    userPassword: ''
  });

  const errorObj = {
    userNameErr: false,
    emailIdErr: false,
    userPasswordErr: false
  };



  console.log([userInfo.userPassword.length,
  userInfo.userName.length,
  userInfo.emailId.length])


  const handleSubmit = async () => {
    if (userInfo.userPassword.length === 0)
      errorObj.userPasswordErr = true
    else
      errorObj.userPasswordErr = false
    if (userInfo.userName.length === 0)
      errorObj.userNameErr = true
    else
      errorObj.userNameErr = false
    if (userInfo.emailId.length === 0)
      errorObj.emailIdErr = true
    else
      errorObj.emailIdErr = false

    //     else {
    //   let config = {
    //     url: createUserUrl,
    //     method: 'POST',
    //     data: {
    //       userName: userInfo.userName,
    //       userEmail: userInfo.emailId,
    //       userPassword: userInfo.userPassword
    //     }
    //   }

    //   let response = await axios(config).then((response) => {
    //     if (response.status === 200)
    //       return response
    //   }).catch((err) => {
    //     console.log(err)
    //   })

    //   localStorage.setItem('userId', response.data.id)
    //   console.log(response.data)
    // }
  }


  return (
    <div className="signup-dialog">
      <TextField className='text-field-custom' label='User Name' error={errorObj.userNameErr} onChange={(e) => {
        setUserInfo(prevState => ({ ...userInfo, userName: e.target.value }))
      }} />
      <TextField className='text-field-custom' label='Email Id' error={errorObj.emailIdErr} onChange={(e) => {
        setUserInfo(prevState => ({ ...userInfo, emailId: e.target.value }))
      }} />
      <TextField className='text-field-custom' type='password' label='Password' error={errorObj.userPasswordErr} onChange={(e) => {
        setUserInfo(prevState => ({ ...userInfo, userPassword: e.target.value }))
      }} />

      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default NewUser