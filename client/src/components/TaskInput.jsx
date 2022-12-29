import React, { useEffect } from 'react'
import { IconButton, TextField, Typography, Snackbar, Alert, Dialog, DialogContent } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './components.css'
import { useState } from 'react';
import PocketBase from 'pocketbase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const pbUrl = process.env.REACT_APP_PB_URL;
const pb = new PocketBase(pbUrl);



// example create data

const TaskInput = () => {

    const { isValid, userId } = useSelector(state => state.user)
    // console.log("TEST>>>>>>>>>>>>>>>", userName, isValid, userId)

    // useEffect(() => {
    //     // navigate('/login')
    // }, [])


    const [taskArray, setTaskArray] = useState([]);
    const [dummy, setDummy] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [serverity, setServerity] = useState('success');
    // const [timer, setTimer] = useState(5);

    // useEffect(() => {
    //     if (!isValid) {

    //         // let timerInterval = setInterval(() => {
    //         //     setTimer((prev) => prev - 1);
    //         // }, 1000)
    //         // if(timer<1)
    //         // setInterval(timerInterval);
    //     }
    // }, [isValid]);




    useEffect(() => {
        async function fetchData() {
            try {
                const resultList = await pb.collection('userTasks').getList(1, 50, {
                    sort: 'created',
                    filter: `userId = "${userId}"`,
                    expand: 'users'
                });
                setTaskArray(resultList.items);
            } catch (error) {
            }
        }

        fetchData();


        pb.collection('userTasks').subscribe('*', async (e) => {
            if (e.action === 'create') {
                setTaskArray((prev) => [...prev, e.record]);
            }

            if (e.action === 'delete') {
                // let newTask = taskArray;

                // newTask = newTask.filter(task=>task.id==e.record.id);
                const resultList = await pb.collection('userTasks').getList(1, 50, {
                    sort: 'created',
                    filter: `userId = "${userId}"`,
                    expand: 'users'
                });
                setTaskArray(resultList.items);
            }
        })

        return async function cleanup() {
            try {
                await pb.collection('userTasks').unsubscribe('*');
            } catch (error) {
                console.log(error)
            }
        };
    }, []);


    // useEffect(() => {









    const addTaskToDb = async () => {

        const data = {
            "userId": userId,
            "taskAct": dummy
        };
        const record = pb.collection('userTasks').create(data);
        return record;
    }

    const handleAddTask = async () => {
        if (dummy.length > 0) {
            try {
                await addTaskToDb();
                setDummy('');
                setServerity('success')
                setMessage('Task added successfully!');
                setOpen(true);
            } catch (error) {
                let errCode = error.data.data.taskAct.code;
                if (errCode.includes('not_unique')) {
                    setServerity('warning')
                    setMessage('This task already exists');
                    setOpen(true);
                }
                else {
                    setServerity('error')
                    setMessage('Having issues at backend');
                    setOpen(true);
                }
            }
            setDummy('');
        }
        else {
            setOpen(true);
            setServerity('warning')
            setMessage('Please enter a task first!');
        }
    }

    const handleDelete = async (taskId) => {
        console.log('prameter>>>>>', taskId)
        const record = await pb.collection('userTasks').delete(taskId);
    }



    const handleSnackClose = () => {
        setOpen(false);
    }


    return (
        <>
            {isValid ? <>

                <h1>Enter a task</h1>
                <br />
                <div className="task-container">
                    <div className='task-input-field'>

                        <TextField className='text-field-custom' value={dummy} onChange={(e) => {
                            if (e.target.value.length)
                                setDummy(e.target.value);
                            else
                                setDummy('')
                        }} />
                        <IconButton onClick={() => handleAddTask()}>
                            <AddIcon />
                        </IconButton>
                    </div>

                    <div className='task-output-field'>
                        {taskArray.map((value) => {
                            return (
                                <div className='task-item-container' key={value.id}>
                                    <div className="task-item">
                                        <Typography className='task-text'>{value.taskAct}</Typography>
                                        <IconButton onClick={() => { handleDelete(value.id) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <Snackbar
                    open={open}
                    onClose={handleSnackClose}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                // key={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleSnackClose} severity={serverity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>

            </> :

                <Dialog open={!isValid}>
                    <DialogContent>
                        <h2>
                            Please <a href='/login' >login</a> first!
                        </h2>

                        {/* <h5>Redirecting to login page in {timer}</h5> */}

                    </DialogContent>
                </Dialog>



            }


        </>
    )
}
export default TaskInput