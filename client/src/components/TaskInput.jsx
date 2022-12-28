import React, { useEffect } from 'react'
import { IconButton, TextField, Typography, Snackbar, Alert, Dialog, DialogContent } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import './components.css'
import { useState } from 'react';
import PocketBase from 'pocketbase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const pbUrl = process.env.REACT_APP_PB_URL;
const pb = new PocketBase(pbUrl);



// example create data

const TaskInput = () => {

    const { userName, isValid, userId } = useSelector(state => state.user)
    // console.log("TEST>>>>>>>>>>>>>>>", userName, isValid, userId)
    const navigate = useNavigate();

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

                console.log(resultList);
                setTaskArray(resultList.items);
            } catch (error) {

            }
        }

        fetchData();


        pb.collection('userTasks').subscribe('*', (e) => {
            if (e.action === 'create') {
                setTaskArray((prev) => [...prev, e.record]);
            }
        })


        return function cleanup() {
            pb.collection('userTasks').unsubscribe();
        };
    }
        , []);


    // useEffect(() => {









    const addTaskToDb = async () => {

        const data = {
            "userId": userId,
            "taskAct": dummy
        };
        const record = pb.collection('userTasks').create(data);
        return record;
    }

    const handleClick = async () => {
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





    const handleSnackClose = () => {
        setOpen(false);
    }


    return (
        <>
            {isValid ? <>
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
                            <Typography key={value.id}>{value.taskAct}</Typography>
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