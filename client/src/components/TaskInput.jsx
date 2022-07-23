import React, { useEffect } from 'react'
import { IconButton, TextField, Typography, Snackbar, Alert } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import './components.css'
import { useState } from 'react';
import axios from 'axios';

const TaskInput = () => {
    const [taskArray, setTask] = useState([]);
    const [dummy, setDummy] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [serverity, setServerity] = useState('');
    const handleClick = async () => {
        if (dummy) {
            if (taskArray.includes(dummy)) {
                setServerity('warning')
                setMessage('This task already exists');
                setOpen(true);
            }
            else {
                setTask(prevTask => [...taskArray, dummy])
                setServerity('success')
                setMessage('Task added successfully!');
                setOpen(true);
                setDummy('');
            }
        }
        else {
            setOpen(true);
            setServerity('warning')
            setMessage('Please enter a task first!');
        }
    }

    const handleSnackClose = () => {
        setOpen(false);
    }


    return (
        <>
            <h1>Please enter a task</h1>

            <div className='task-input-field'>
                <section>
                    <TextField value={dummy} onChange={(e) => {
                        if (e.target.value.length)
                            setDummy(e.target.value);
                        else
                            setDummy('')
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
                    return (
                        <Typography key={value}>{value}</Typography>
                    )
                })}
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
export default TaskInput