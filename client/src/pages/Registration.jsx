import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, registerUser } from '../redux/features/authSlice';

import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

import logo from '../assets/main/Logo.svg';
import avatar_registration from '../assets/main/avatar_registration.svg';

import "/node_modules/flag-icons/css/flag-icons.min.css";
import ChangeLanguage from '../components/ChangeLanguage';



const Registration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(checkIsAuth);
    const { status } = useSelector(state => state.auth);

    useEffect(() => {
        if (status) toast(status);
        if (isAuth) navigate('/');
    }, [status, isAuth, navigate]);

    const handleSubmitForm = () => {
        try {
            if (password === passwordMatch) {
                dispatch(registerUser({ email, password, fullName, city }));
                setEmail('');
                setPassword('');
                setPasswordMatch('');
                setFullName('');
                setCity('');
            } else {
                toast(t('PasswordMathError'))
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <section className='flex flex-col min-h-screen bg-white py-3 px-5 text-2xl font-roboto font-extralight'>
            <div className='w-full flex justify-between items-start'>
                <div className="logo">
                    <img className='w-16 h-16' src={logo} alt="logo" />
                </div>

                <ChangeLanguage />
            </div>


            <div className="flex-1 flex justify-center items-center pb-28">
                <form
                    className='flex flex-col items-center gap-7'
                    onSubmit={handleSubmit(handleSubmitForm)}
                >
                    <h1>{t('Registration')}</h1>

                    <img src={avatar_registration} alt="avatar_registration" />

                    <div className='flex flex-col gap-9'>
                        <div className='border border-b-[2px] border-t-0 border-l-0 border-r-0 border-b-gray-200'>
                            <input
                                {...register('fullName', {
                                    required: true,
                                    maxLength: 99,
                                    pattern: /^[а-яА-Яa-zA-Z]+$/
                                })}
                                type="text"
                                placeholder={t('Login')}
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                className='placeholder:text-light-gray placeholder:text-xl placeholder:text-center placeholder:opacity-40 focus:outline-none'
                            />
                            {errors?.fullName?.type === "required" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> {t("RequiredError")} </p>}
                            {errors?.fullName?.type === "maxLength" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> {t("LoginError")} </p>}
                            {errors?.fullName?.type === "pattern" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> {t('AlphabetError')} </p>}

                        </div>

                        <div className='border border-b-[2px] border-t-0 border-l-0 border-r-0 border-b-gray-200'>
                            <input
                                {...register('email', {
                                    required: true,
                                })}
                                type="email"
                                placeholder={t('Email')}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className='placeholder:text-light-gray placeholder:text-xl placeholder:text-center placeholder:opacity-40 focus:outline-none'
                            />
                            {errors?.email?.type === "required" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> {t("RequiredError")} </p>}

                        </div>

                        <div className='border border-b-[2px] border-t-0 border-l-0 border-r-0 border-b-gray-200'>
                            <input
                                {...register('password', {
                                    required: true
                                })}
                                type="password"
                                placeholder={t('Password')}
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='placeholder:text-light-gray placeholder:text-xl placeholder:text-center placeholder:opacity-40 focus:outline-none'
                            />
                            {errors?.password?.type === "required" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> {t("RequiredError")} </p>}
                        </div>

                        <div className='border border-b-[2px] border-t-0 border-l-0 border-r-0 border-b-gray-200'>
                            <input
                                {...register('password', {
                                    required: true,
                                    validate: (value) => value === password,
                                })}
                                type="password"
                                placeholder={t('PasswordMatch')}
                                name="password"
                                value={passwordMatch}
                                onChange={e => setPasswordMatch(e.target.value)}
                                className='placeholder:text-light-gray placeholder:text-xl placeholder:text-center placeholder:opacity-40 focus:outline-none'
                            />
                            {errors?.password?.type === "required" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> {t("RequiredError")} </p>}
                        </div>

                        <div className='border border-b-[2px] border-t-0 border-l-0 border-r-0 border-b-gray-200'>
                            <input
                                {...register('city', {
                                    required: true,
                                    maxLength: 99,
                                    pattern: /^[а-яА-Яa-zA-Z]+$/
                                })}
                                type="text"
                                placeholder={t('City')}
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                className='placeholder:text-light-gray placeholder:text-xl placeholder:text-center placeholder:opacity-40 focus:outline-none'
                            />
                            {errors?.city?.type === "required" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> {t("RequiredError")} </p>}
                            {errors?.city?.type === "maxLength" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> {t("CityError")} </p>}
                            {errors?.city?.type === "pattern" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> {t('AlphabetError')} </p>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link
                            className='text-base text-center text-light-blue'
                            to="/login"
                        >
                            {t('AlraedyRegistrated')}
                        </Link>

                        <button
                            className='text-xl px-8 py-[6px] text-white bg-medium-blue'
                            onClick={handleSubmitForm}
                            type='submit'
                        >
                            {t('GetRegistrated')}
                        </button>
                    </div>
                </form>
            </div>


        </section>

    )
}

export default Registration