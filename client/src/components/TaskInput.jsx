import React, { useEffect } from 'react'
import { IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import './components.css'
import { useState } from 'react';
const TaskInput = () => {
    const [taskArray, setTask] = useState(['1']);
    const handleClick = () => {
        console.log(taskArray);
        setTask(taskArray);
    }
    return (
        taskArray.map((value) => {

            return (
                <div className='task-input-field' key={value}>
                    <section>
                        <TextField onChange={(e) => {
                            if (e.target.value.length)
                                taskArray.push(e.target.value);
                        }} />
                    </section>
                    <section>
                        <IconButton onClick={() => handleClick()}>
                            <AddIcon />
                        </IconButton>
                    </section>
                </div>
            )
        })
    )
}
export default TaskInput