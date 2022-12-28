import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import PocketBase from 'pocketbase';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/user';
import { useNavigate } from 'react-router-dom';

const pbUrl = process.env.REACT_APP_PB_URL;

const pb = new PocketBase(pbUrl);


console.log(pbUrl)



const LoginUser = () => {
  const [userInfo, setUserInfo] = useState({
    userName: null,
    emailId: null,
    userPassword: null
  });
  const { userName, isValid } = useSelector(state => state.user)
  const navigate = useNavigate();


  console.log("TEST>>>>>>>>>>>>>>>", userName, isValid)
  console.log(userInfo)

  const dispatch = useDispatch();

  const handleClick = async () => {
    const authData = await pb.collection('users').authWithPassword(
      userInfo.emailId,
      userInfo.userPassword,
    );



    console.log(">>>>>>", authData);



    // after the above you can also access the auth data from the authStore
    // console.log(pb.authStore.isValid);
    // console.log(pb.authStore.token);
    // console.log(pb.authStore.model.id);
    // "logout" the last authenticated account
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