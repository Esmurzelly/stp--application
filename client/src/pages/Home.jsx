import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/features/authSlice';
import { toast } from 'react-toastify';
import Map from '../components/Map';

import { getAllMarkers } from '../redux/features/markerSlice';
import ModalWindow from '../components/ModalWindow';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    const handleChangeModal = () => {
        setOpenModal(prev => !prev)
    }

    const { user } = useSelector(state => state.auth);

    const handleLogOut = () => {
        dispatch(logOut());
        window.localStorage.removeItem('token');
        toast('Вы вышли из системы');
    }
    return (
        <div>
            <h1>Home</h1>
            <div>
                <button onClick={handleChangeModal}>Open Modal</button>
                {
                    openModal && (
                        <ModalWindow handleChangeModal={handleChangeModal} />
                    )
                }
            </div>

            <div className='w-full h-[700px]'>
                <Map />
            </div>

            {user && (
                <ul>
                    <li>Name: {user?.fullName}</li>
                    <li>Email: {user?.email}</li>
                    <li>City: {user?.city}</li>
                </ul>
            )}


            <Link to={`/login`} onClick={handleLogOut}>Log out</Link>
        </div>
    )
}

export default Home