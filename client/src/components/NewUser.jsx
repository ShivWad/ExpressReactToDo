import { TextField, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const NewUser = () => {
  const [userInfo, setUserInfo] = useState({ userName: '', emailId: '', password: '' })
  const handleSubmit = () => {

  }
  return (
    <div className="signup-dialog">
      <TextField className='text-field-custom' label='User Name' onChange={(e) => {
        setUserInfo(prevState => ({ ...userInfo, userName: e.target.value }))
        console.log(userInfo)
      }} />
      <TextField className='text-field-custom' label='Email Id' onChange={(e) => {
        setUserInfo(prevState => ({ ...userInfo, emailId: e.target.value }))
        console.log(userInfo)
      }} />
      <TextField className='text-field-custom' type='password' label='Password' onChange={(e) => {
        setUserInfo(prevState => ({ ...userInfo, password: e.target.value }))
        console.log(userInfo)
      }} />

      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default NewUser