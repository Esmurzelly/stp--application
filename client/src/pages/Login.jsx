import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkIsAuth, loginUser } from '../redux/features/authSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

import logo from '../assets/main/Logo.svg';

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isAuth = useSelector(checkIsAuth);

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            if (status) toast(status);
            if (isAuth) navigate('/');
        } catch (error) {
            console.log(`error in useEffect - ${error}`);
        }
    }, [status, isAuth, navigate]);

    const handleSubmitForm = () => {
        try {
            dispatch(loginUser({ email, password }));
        } catch (error) {
            console.log(`error in handleSubmit - ${error}`);
        }
    };




    return (
        <section className='flex flex-col min-h-screen bg-white py-3 px-5 text-2xl font-roboto font-extralight'>
            <div className="logo">
                <img className='w-16 h-16' src={logo} alt="logo" />
            </div>

            <div className="flex-1 flex justify-center items-center pb-28">
                <form
                    className='flex flex-col items-center gap-7'
                    onSubmit={handleSubmit(handleSubmitForm)}>
                    <h1>Авторизация</h1>

                    <div className="flex flex-col gap-9 mt-8">
                        <div className='border border-b-[2px] border-t-0 border-l-0 border-r-0 border-b-gray-200'>
                            <input
                                {...register("email", {
                                    required: true,
                                    maxLength: 99,
                                })}
                                className='placeholder:text-light-gray placeholder:text-xl placeholder:text-center placeholder:opacity-40 focus:outline-none'
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Email'
                            />
                            {errors?.email?.type === "required" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> Это поле обязательно для заполнения</p>}
                            {errors?.email?.type === "maxLength" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> Email не должен превышать 99 символов</p>}
                        </div>

                        <div className='border border-b-[2px] border-t-0 border-l-0 border-r-0 border-b-gray-200'>
                            <input
                                {...register("password", {
                                    required: true,
                                })}
                                className='placeholder:text-light-gray placeholder:text-xl placeholder:text-center placeholder:opacity-40 focus:outline-none'
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Пароль'
                            />
                            {errors?.password?.type === "required" && <p className='text-red-600 text-xs flex gap-2'><ExclamationTriangleIcon width={12} /> Это поле обязательно для заполнения</p>}
                        </div>

                    </div>


                    <div className="flex flex-col gap-3">
                        <Link
                            className='text-base text-center text-light-blue'
                            to="/register">
                            Нет аккаунта?
                        </Link>

                        <button
                            className='text-xl px-8 py-[6px] text-white bg-medium-blue'
                            type="submit"
                            onClick={handleSubmitForm}>
                            Войти
                        </button>

                    </div>
                </form>
            </div>
        </section>

    );
};

export default Login;
