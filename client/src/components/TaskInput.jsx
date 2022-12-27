import React, { useEffect } from 'react'
import { IconButton, TextField, Typography, Snackbar, Alert } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import './components.css'
import { useState } from 'react';
import axios from 'axios';
import PocketBase from 'pocketbase';


const pb = new PocketBase('http://127.0.0.1:8090');



// example create data

const TaskInput = () => {
    const [taskArray, setTask] = useState([]);
    const [dummy, setDummy] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [serverity, setServerity] = useState('success');
    const [tasksInDb, setTasksInDb] = useState({})

    const addTaskToDb = async () => {


        const data = {
            "userId": localStorage.getItem('userId'),
            "taskAct": dummy
        };
        
        
        const record = await pb.collection('userTasks').create(data);
        console.log(record)
        
        // let config = {
        //     data: {
        //         taskId: 34,
        //         userId: 2,
        //         taskAct: dummy
        //     },
        //     url: 'http://localhost:8080/api/tasks/create',
        //     method: 'POST'

        // }

        // let response = await axios(config).then((response) => {
        //     console.log(response.data);
        //     return response.status;
        // }).catch(err => console.log(err))


        return record;
    }

    const handleClick = async () => {
        if (dummy) {
            if (taskArray.includes(dummy)) {
                setServerity('warning')
                setMessage('This task already exists');
                setOpen(true);
            }
            else {
                setTask(prevTask => [...taskArray, dummy])
                let response = await addTaskToDb();
                // if (response === 200) {
                //     setDummy('');
                //     setServerity('success')
                //     setMessage('Task added successfully!');
                //     setOpen(true);
                // }
                // else {
                //     setServerity('error')
                //     setMessage('Having issues at backend');
                //     setOpen(true);
                // }
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