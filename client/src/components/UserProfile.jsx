import React, { useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { editUserProfile, logOut, uploadAvatar, deleteAvatar } from '../redux/features/authSlice';

import { useTranslation } from 'react-i18next';

import ChangeLanguage from './ChangeLanguage';

import logo from '../assets/main/Logo.svg';
import avatar_registration from '../assets/main/avatar_registration.svg';
import changeInfo from '../assets/main/changeInfo.svg';

import { XMarkIcon, TrashIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';

import { toast } from 'react-toastify';


const UserProfile = React.memo(({ showMenu, setShowMenu }) => {
    const { user } = useSelector(state => state.auth);
    const isAdminUser = useSelector(state => state.auth.isAdmin);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const filePicekerRef = useRef(null);

    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [city, setCity] = useState(user.city);

    // const userAvatarPhoto = user.avatar === null || user.avatar === '' ? avatar_registration : `https://besafeapp.ru/static/userAvatar/${user.avatar}`;
    const userAvatarPhoto = user.avatar === null || user.avatar === '' ? avatar_registration : `${process.env.REACT_APP_REQUEST_AVATAR}/${user.avatar}`;

    const [changeClickFullName, setChangeClickFullName] = useState(false);
    const [changeClickEmail, setChangeClickEmail] = useState(false);
    const [changeClickCity, setChangeClickCity] = useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);

        const reader = new FileReader();

        const selectedFile = e.target.files[0];
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }

        reader.onload = (readerEvent) => {
            if (selectedFile.type.includes("image")) {
                setImagePreview(readerEvent.target.result);
            }
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProfile = {
            fullName,
            email,
            city,
        };

        dispatch(editUserProfile(updatedProfile));

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            dispatch(uploadAvatar(formData));
        }

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleLogOut = () => {
        dispatch(logOut());
        window.localStorage.removeItem('token');
        toast(t('YouLeftFromAccount'));
    }

    const handleAvatarClick = () => {
        filePicekerRef.current.click();
    };

    const handleCloseProfile = () => {
        setShowMenu(prev => !prev)
        setImagePreview(null);
    }

    return (
        <section
            className={`bg-white py-3 px-5 text-2xl font-roboto font-extralight w-full flex flex-col justify-center items-start min-h-full 
                        ${showMenu ? 'translate-x-[0%]' : 'translate-x-[100%] hidden'} ease-in duration-300 z-50 absolute top-0 right-0 overflow-hidden`}>

            <XMarkIcon className='absolute z-40 w-8 h-w-8 right-3 top-3 cursor-pointer' onClick={() => handleCloseProfile()} />

            <div className="logo">
                <img className='w-16 h-16' src={logo} alt="logo" />
            </div>

            <div className="flex flex-1 pb-28 text-center w-full">
                <form className='flex flex-col gap-7 justify-center items-center w-full' onSubmit={handleSubmit}>
                    <h1>{t('Profile')}</h1>

                    <div className='flex flex-col items-center gap-3' >
                        <div className='flex flex-row items-end'>
                            {imagePreview != null ? (
                                <div className='flex flex-row items-center gap-6'>
                                    <img onClick={handleAvatarClick} className='w-20 rounded-md cursor-pointer' src={userAvatarPhoto} alt="avatar_registration" />
                                    <ArrowLongRightIcon className='w-5 h-5' />
                                    {imagePreview != null && <img className='w-20 rounded-md' src={imagePreview} alt="imagePreview" />}

                                    <button className='absolute ml-[240px]' onClick={() => dispatch(deleteAvatar())}>
                                        <TrashIcon className='w-6 h-6 cursor-pointer text-light-blue' />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <img onClick={handleAvatarClick} className='w-20 rounded-md cursor-pointer' src={userAvatarPhoto} alt="avatar_registration" />

                                    <button className='absolute ml-24' onClick={() => dispatch(deleteAvatar())}>
                                        <TrashIcon className='w-6 h-6 cursor-pointer text-light-blue' />
                                    </button>
                                </>
                            )}
                        </div>
                        <input className='hidden' ref={filePicekerRef} type="file" onChange={handleFileChange} accept='image/*' />
                    </div>

                    <ul className='text-light-gray  mx-auto flex items-start flex-col gap-2'>
                        <li className='flex gap-2 items-center'>
                            <span>{t('Name')}: </span>
                            {changeClickFullName ? (
                                <input type="text" defaultValue="" placeholder={t('EnterName')} onChange={e => setFullName(e.target.value)} name="" id="" />
                            ) : (
                                <>
                                    <span>{user.fullName}</span>
                                    <img className='cursor-pointer' onClick={() => setChangeClickFullName(true)} src={changeInfo} alt="changeInfo" />
                                </>
                            )}
                        </li>

                        <li className='flex gap-2 items-center'>
                            <span>{t('Email')}: </span>
                            {changeClickEmail ? (
                                <input type="email" defaultValue="" placeholder={t('EnterEmail')} onChange={e => setEmail(e.target.value)} name="" id="" />
                            ) : (
                                <>
                                    <span>{user.email}</span>
                                    <img className='cursor-pointer' onClick={() => setChangeClickEmail(true)} src={changeInfo} alt="changeInfo" />
                                </>
                            )}
                        </li>


                        <li className='flex gap-2 items-center'>
                            <span>{t('City')}: </span>
                            {changeClickCity ? (
                                <input type="text" defaultValue="" placeholder={t('EnterCity')} onChange={e => setCity(e.target.value)} name="" id="" />
                            ) : (
                                <>
                                    <span>{user.city}</span>
                                    <img className='cursor-pointer' onClick={() => setChangeClickCity(true)} src={changeInfo} alt="changeInfo" />
                                </>
                            )}
                        </li>
                    </ul>

                    <div className='flex flex-col gap-3'>
                        <button
                            type="submit"
                            className='text-xl px-8 py-[6px] text-white bg-medium-blue'
                        >{t('SaveChanges')}
                        </button>

                        {isAdminUser && (
                            <Link to="/admin-panel" className='text-xl px-8 py-[6px] text-white bg-medium-blue'>{t('AdminPanel')}</Link>
                        )}

                        <Link className='text-xl px-8 py-[6px] text-white bg-medium-blue' to={`/login`} onClick={handleLogOut}>{t('LogOut')}</Link>
                    </div>

                    <ChangeLanguage />
                </form>
            </div>


        </section>
    );
});

export default UserProfile