import { TextField, Button, Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router-dom';

const pbUrl = process.env.REACT_APP_PB_URL;

const pb = new PocketBase(pbUrl);


const NewUser = () => {
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });

  const [confirmPass, setConfirmPass] = useState('')
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [serverity, setServerity] = useState('success');
  const handleSnackClose = () => {
    setOpen(false);
  }

  // console.log([userInfo.userPassword.length,
  // userInfo.userName.length,
  // userInfo.emailId.length])

  const data = {
    "username": userInfo.userName,
    "email": userInfo.userEmail,
    "emailVisibility": true,
    "password": userInfo.userPassword,
    "passwordConfirm": confirmPass,
    "name": userInfo.userName,
    "verified": true
  };



  const handleSubmit = async () => {
    // const
    if (userInfo.userName.length > 0 && userInfo.userEmail.length > 0 && userInfo.userPassword.length > 0) {
      if (userInfo.userPassword !== confirmPass) {
        setMessage('Password not same!');
        setOpen(true);
        setServerity('warning');
        return;
      }

      // let config = {
      //   url: createUserUrl,
      //   method: 'POST',
      //   data: userInfo
      // }


      const data = {
        "username": userInfo.userName,
        "email": userInfo.userEmail,
        "emailVisibility": true,
        "password": userInfo.userPassword,
        "passwordConfirm": confirmPass,
        "name": userInfo.userName,
      };


      // console.log(">>>>", data);
      // let config = {
      //   url: `${pbUrl}/api/collections/users/records`,
      //   body: JSON.stringify(data),
      //   method: 'POST',
      //   "headers": {
      //     'Content-Type': 'application/json'
      //   },
      // };

      // let record = await axios(config);
      try {
        const record = await pb.collection('users').create(data);
        navigator('/login')
      } catch (error) {

        if (error.data.data?.email)
          setMessage(error.data.data.email.message);
        else if (error.data.data?.username)
          setMessage(error.data.data.username.message);

        setServerity('warning');
        setOpen(true);
      }



      // (optional) send an email verification request
      // await pb.collection('users').requestVerification('test@example.com');

      // let response = await axios(config)
      //   .then((response) => {
      //     console.log("---->", response.data)
      //     return response
      //   }).catch((err) => {
      //     console.log("--->", err.response)
      //     return err.response
      //   })

      // console.log("===========>", response)
      // if (response.status == 409) {
      //   setOpen(true)
      //   setServerity('warning')
      //   setMessage('This user already exists! Please use a different Email');
      // }

      // if (response.status == 500) {
      //   setOpen(true)
      //   setServerity('warning')
      //   setMessage('We are facing some issue at backend');
      // }
      // if (response.status == 200) {
      //   setOpen(true)
      //   setServerity('success')
      //   setMessage('Account created! Please log in to create Tasks!');
      //   // Simulate an HTTP redirect:
      //   props.handleLogIn(true)

      //   localStorage.setItem('userId', response.data.id);
      // }
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
        <TextField className='text-field-custom' type='password'
          label='Confirm Password' onChange={(e) => {
            setConfirmPass(e.target.value);
          }} />

        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}>
          Submit
        </Button>


        <Button
          variant='contained'
          color='primary'
          onClick={() => navigator('/login')}>
          Already a user?
        </Button>

      </div>
      <Snackbar
        open={open}
        onClose={handleSnackClose}
        autoHideDuration={3000}
        // anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}

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