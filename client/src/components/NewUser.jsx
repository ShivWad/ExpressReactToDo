import { TextField, Button, Alert, Snackbar } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const createUserUrl = "http://localhost:8080/api/user/createUser"

const NewUser = (props) => {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [serverity, setServerity] = useState('success');

  // const [errorObj, setErrorObj] = useState({
  //   userNameErr: false,
  //   emailIdErr: false,
  //   userPasswordErr: false
  // });



  const handleSnackClose = () => {
    setOpen(false);
  }

  // console.log([userInfo.userPassword.length,
  // userInfo.userName.length,
  // userInfo.emailId.length])


  const handleSubmit = async () => {
    // const
    if (userInfo.userName.length > 0 && userInfo.userEmail.length > 0 && userInfo.userPassword.length > 0) {
      console.log(userInfo);
      let config = {
        url: createUserUrl,
        method: 'POST',
        data: userInfo
      }

      let response = await axios(config)
        .then((response) => {
          console.log("---->", response.data)
          return response
        }).catch((err) => {
          console.log("--->", err.response)
          return err.response
        })

      console.log("===========>", response)
      if (response.status == 409) {
        setOpen(true)
        setServerity('warning')
        setMessage('This user already exists! Please use a different Email');
      }

      if (response.status == 500) {
        setOpen(true)
        setServerity('warning')
        setMessage('We are facing some issue at backend');
      }
      if (response.status == 200) {
        setOpen(true)
        setServerity('success')
        setMessage('Account created! Please log in to create Tasks!');
        // Simulate an HTTP redirect:
        props.handleLogIn(true)
      }
    }

    else {
      setOpen(true)
      setServerity('warning')
      setMessage('Please enter all the details!');
    }

  }

  // useEffect(() => {


  // }, [userInfo])


  return (
    <>
      <div className="signup-dialog">
        <TextField className='text-field-custom'
          label='User Name' onChange={(e) => {
            setUserInfo(prevState => ({ ...userInfo, userName: e.target.value }))
          }} />
        <TextField className='text-field-custom'
          label='Email Id' onChange={(e) => {
            setUserInfo(prevState => ({ ...userInfo, userEmail: e.target.value }))
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
      <Snackbar
        open={open}
        onClose={handleSnackClose}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      // key={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackClose} severity={serverity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default NewUser