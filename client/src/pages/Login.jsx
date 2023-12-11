import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "/node_modules/flag-icons/css/flag-icons.min.css";

import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../redux/features/authSlice';

import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

import logo from '../assets/main/Logo.svg';
import { ChangeLanguage } from '../components';
import InputComponent from '../components/InputComponent';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { t } = useTranslation();

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

    const handleSubmitForm = (e) => {
        e.preventDefault();

        try {
            dispatch(loginUser({ email, password }));
        } catch (error) {
            console.log(`error in handleSubmit - ${error}`);
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
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit(handleSubmitForm(e));
                        }
                    }}

                    className='flex flex-col items-center gap-7'
                    onSubmit={(e) => handleSubmit(handleSubmitForm(e))}
                >
                    <h1>{t('Authorization')}</h1>

                    <div className="flex flex-col gap-9 mt-8">
                        <InputComponent
                            type="email"
                            placeholder={t('Email')}
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            register={register}
                            error={errors?.email?.type}
                            required={true}
                            maxLength={99}
                            autoComplete={'on'}
                        />

                        <InputComponent
                            type="password"
                            placeholder={t('Password')}
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            register={register}
                            error={errors?.password?.type}
                            required={true}
                            autoComplete={'on'}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link
                            className='text-base text-center text-light-blue'
                            to="/register">
                            {t('NoAccount')}
                        </Link>

                        <button
                            className='text-xl px-8 py-[6px] text-white bg-medium-blue'
                            type='submit'
                        >
                            {t('Enter')}
                        </button>

                    </div>
                </form>
            </div>
        </section>

    );
};

export default Login;
