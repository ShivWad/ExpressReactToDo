import React, { useEffect } from 'react'
import { IconButton, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import './components.css'
import { useState } from 'react';
import axios from 'axios';


const TaskInput = () => {
    const [taskArray, setTask] = useState([]);
    const [dummy, setDummy] = useState('')

    const handleClick = async () => {
        let config = {
            url: 'http://localhost:8080/create',
            method: 'post',
            data: {
                id: 1,
                userName: 'shivamasd',
                emailId: 'apj@gmail.com',
            }
        }
        let response = await axios(config).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })
        console.log(response)
        if (dummy) {
            if (taskArray.includes(dummy))
                window.alert('This task is already added!')
            else {
                setTask(prevTask => [...taskArray, dummy])
                setDummy('')
            }
        }

        else
            window.alert('Please enter a task first!');

    }



    return (
        <>
            <div className='task-input-field'>
                <section>
                    <TextField onChange={(e) => {
                        if (e.target.value.length)
                            setDummy(e.target.value);
                    }} />
                </section>
                <section>
                    <IconButton onClick={() => handleClick()}>
                        <AddIcon />
                    </IconButton>
                </section>
            </div>

            <div className='task-output-field'>
                {taskArray.map((value) => {
                    console.log(value);
                    return (
                        <Typography key={value}>{value}</Typography>
                    )
                })}
            </div>
        </>
    )
}
export default TaskInput