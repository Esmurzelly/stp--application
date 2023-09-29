import React, { useState } from 'react';
import { editUserProfile, logOut } from '../redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { motion } from 'framer-motion';

import logo from '../assets/main/Logo.svg';
import avatar_registration from '../assets/main/avatar_registration.svg';
import changeInfo from '../assets/main/changeInfo.svg';

import { toast } from 'react-toastify';

const UserProfile = ({ user, showMenu, setShowMenu }) => {
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [city, setCity] = useState(user.city);

    const [changeClickFullName, setChangeClickFullName] = useState(false);
    const [changeClickEmail, setChangeClickEmail] = useState(false);
    const [changeClickCity, setChangeClickCity] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = () => {
        const updatedProfile = {
            fullName,
            email,
            city,
        };

        dispatch(editUserProfile(updatedProfile));
    };

    const handleLogOut = () => {
        dispatch(logOut());
        window.localStorage.removeItem('token');
        toast('Вы вышли из аккаунта');
    }

    return (
        <section
            className={`bg-white py-3 px-5 text-2xl font-roboto font-extralight w-full flex flex-col justify-center items-start min-h-full 
                        ${showMenu ? 'translate-x-[0%]' : 'translate-x-[100%] hidden'} ease-in duration-300 z-50 absolute top-0 right-0`}>

            <XMarkIcon className='absolute z-40 w-8 h-w-8 right-3 top-3' onClick={() => setShowMenu(prev => !prev)} />

            <div className="logo">
                <img className='w-16 h-16' src={logo} alt="logo" />
            </div>

            <div className="flex flex-1 pb-28 text-center w-full">
                <form className='flex flex-col gap-7 justify-center items-center w-full' onSubmit={handleSubmit}>
                    <h1>Профиль</h1>

                    <img className='w-32 h-3w-32' src={avatar_registration} alt="avatar_registration" />

                    <ul className='text-light-gray text-left mx-auto flex flex-col gap-2 w-[80%]'>
                        <li className='flex gap-2 items-center'>
                            <span>Имя: </span>
                            {changeClickFullName ? (
                                <input type="text" defaultValue="" placeholder='Введите новое имя' onChange={e => setFullName(e.target.value)} name="" id="" />
                            ) : (
                                <>
                                    <span>{user.fullName}</span>
                                    <img onClick={() => setChangeClickFullName(true)} src={changeInfo} alt="changeInfo" />
                                </>
                            )}
                        </li>

                        <li className='flex gap-2 items-center'>
                            <span>Email: </span>
                            {changeClickEmail ? (
                                <input type="email" defaultValue="" placeholder='Введите новый email' onChange={e => setEmail(e.target.value)} name="" id="" />
                            ) : (
                                <>
                                    <span>{user.email}</span>
                                    <img onClick={() => setChangeClickEmail(true)} src={changeInfo} alt="changeInfo" />
                                </>
                            )}
                        </li>


                        <li className='flex gap-2 items-center'>
                            <span>Город: </span>
                            {changeClickCity ? (
                                <input type="text" defaultValue="" placeholder='Введите новый город' onChange={e => setCity(e.target.value)} name="" id="" />
                            ) : (
                                <>
                                    <span>{user.city}</span>
                                    <img onClick={() => setChangeClickCity(true)} src={changeInfo} alt="changeInfo" />
                                </>
                            )}
                        </li>
                    </ul>

                    <div className='flex flex-col gap-3'>
                        <button
                            type="submit"
                            className='text-xl px-8 py-[6px] text-white bg-medium-blue'
                        >Сохранить изменения</button>
                        <Link className='text-xl px-8 py-[6px] text-white bg-medium-blue' to={`/login`} onClick={handleLogOut}>Выйти</Link>
                    </div>
                </form>
            </div>


        </section>



    )
}

export default UserProfile