import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import PocketBase from 'pocketbase';




const pbUrl = 'http://127.0.0.1:8090'
const pb = new PocketBase(pbUrl);


const LoginUser = () => {
  const [userInfo, setUserInfo] = useState({
    userName: null,
    emailId: null,
    userPassword: null
  });

  const handleClick = async () => {
    const authData = await pb.collection('users').authWithPassword(
      userInfo.emailId,
      userInfo.userPassword,
    );

    console.log(">>>>>>", authData);

    // after the above you can also access the auth data from the authStore
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model.id);
    // "logout" the last authenticated account
    if (pb.authStore.token) {
      localStorage.setItem('authDataToken', pb.authStore.token);
      localStorage.setItem('isValid', pb.authStore.isValid);
      localStorage.setItem('userId', pb.authStore.model.id)
    }
    pb.authStore.clear();

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

      <Button variant="contained" onClick={() => handleClick()}>Log In</Button>
    </div>
  )
}

export default LoginUser