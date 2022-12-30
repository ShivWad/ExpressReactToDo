import { Button, TextField, Snackbar, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import PocketBase from 'pocketbase';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/user';
import { useNavigate } from 'react-router-dom';

const pbUrl = process.env.REACT_APP_PB_URL;

const pb = new PocketBase(pbUrl);



const LoginUser = () => {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    emailId: '',
    userPassword: ''
  });
  const { userName, isValid } = useSelector(state => state.user)
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');


  const dispatch = useDispatch();


  const handleSnackClose = () => {
    setOpen(false);
  }


  const handleLogIn = async () => {

    if(userInfo.emailId.length>0 && userInfo.userPassword.length > 0){

      try {
        const authData = await pb.collection('users').authWithPassword(
        userInfo.emailId,
        userInfo.userPassword,
      );
      if (pb.authStore.token) {
        dispatch(login({
          userName: authData.record.name,
          emailId: userInfo.emailId,
          isValid: pb.authStore.isValid,
          userId: authData.record.id
        }));
        // localStorage.setItem('authDataToken', pb.authStore.token);
        // localStorage.setItem('isValid', pb.authStore.isValid);
        // localStorage.setItem('userId', pb.authStore.model.id)
        navigate('/create');
      }
    } catch (error) {
      setMessage(error.data.message);
      setOpen(true);
    }
  }

  else{
    setMessage('Please enter all the details');
    setOpen(true);
  }
  }


  const redirectToSignUp = () => {
    navigate('/signup');
  }


  return (
    <>
      <div className="signup-dialog">
        <TextField className='text-field-custom'
          label='Email Id' onChange={(e) => {
            setUserInfo(prevState => ({ ...userInfo, emailId: e.target.value }))
          }} />
        <TextField className='text-field-custom' type='password'
          label='Password' onChange={(e) => {
            setUserInfo(prevState => ({ ...userInfo, userPassword: e.target.value }))
          }} />

        <Button variant="contained" onClick={() => handleLogIn()}>Log In</Button>
        <Button variant="contained" onClick={() => redirectToSignUp()}>New User?</Button>

      </div>

      <Snackbar
        open={open}
        onClose={handleSnackClose}
        autoHideDuration={3000}
        // anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      // key={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackClose} severity='warning' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default LoginUser