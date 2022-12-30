import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PocketBase from 'pocketbase';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/user';

const pbUrl = process.env.REACT_APP_PB_URL;
const pb = new PocketBase(pbUrl);
const SideBar = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();


    const { isValid } = useSelector(state => state.user);

    const handlSignOut = async () => {

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
                    {isValid && <Button onClick={handlSignOut}>
                        Sign out
                    </Button>}
                </div>
            </div>
        </>
    )
}

export default SideBar