import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PocketBase from 'pocketbase';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user';

const pbUrl = process.env.REACT_APP_PB_URL;
const pb = new PocketBase(pbUrl);
const SideBar = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();



    const handlSignOut = async () => {
        console.log('INSIDE CLEANUP')

        try {
            await pb.collection('userTasks').unsubscribe();
            await pb.collection('users').unsubscribe();
        } catch (error) {
            console.log(error);
        }

        pb.authStore.clear();
        dispatch(signOut());
        setTimeout(() => {
            navigator('/login');
        }, 500)
    }
    return (
        <>

            <div className="side-bar-container">
                <div className='side-bar-content'>
                    <Button onClick={() => { navigator('/create') }}>
                        Task
                    </Button>
                
                    <Button onClick={handlSignOut}>
                        Sign out
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SideBar