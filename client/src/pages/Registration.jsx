import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, registerUser } from '../redux/features/authSlice';

import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

import logo from '../assets/main/Logo.svg';
import avatar_registration from '../assets/main/avatar_registration.svg';

import '/node_modules/flag-icons/css/flag-icons.min.css';
import { ChangeLanguage } from '../components';
import InputComponent from '../components/InputComponent';

const Registration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
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
                toast(t('PasswordMathError'));
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <section className="flex flex-col min-h-screen bg-white py-3 px-5 text-2xl font-roboto font-extralight">
            <div className="w-full flex justify-between items-start">
                <div className="logo">
                    <img className="w-16 h-16" src={logo} alt="logo" />
                </div>

                <ChangeLanguage />
            </div>

            <div className="flex-1 flex justify-center items-center pb-28">
                <form
                    className="flex flex-col items-center gap-7"
                    onSubmit={handleSubmit(handleSubmitForm)}
                >
                    <h1>{t('Registration')}</h1>

                    <img src={avatar_registration} alt="avatar_registration" />

                    <div className="flex flex-col gap-9">
                        <InputComponent
                            type="text"
                            placeholder={t('Login')}
                            name="fullName"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            register={register}
                            error={errors?.fullName?.type}
                            required={true}
                            minLength={3}
                            maxLength={99}
                            autoComplete={'off'}
                            pattern={/^[а-яА-Яa-zA-Z]+$/}
                        />
                        <InputComponent
                            type="email"
                            placeholder={t('Email')}
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            register={register}
                            error={errors?.email?.type}
                            required={true}
                            minLength={7}
                            maxLength={40}
                            autoComplete={'off'}
                            pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g}
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
                            minLength={4}
                            maxLength={30}
                            autoComplete={'off'}
                        />
                        <InputComponent
                            type="password"
                            placeholder={t('PasswordMatch')}
                            name="passwordMatch"
                            value={passwordMatch}
                            onChange={e => setPasswordMatch(e.target.value)}
                            register={register}
                            error={errors?.passwordMatch?.type}
                            required={true}
                            autoComplete={'off'}
                            validatePasswordMatch={true}
                        />
                        <InputComponent
                            type="text"
                            placeholder={t('City')}
                            name="city"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            register={register}
                            error={errors?.city?.type}
                            required={true}
                            minLength={2}
                            maxLength={99}
                            autoComplete={'off'}
                            pattern={/^[а-яА-Яa-zA-Z]+$/}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link className="text-base text-center text-light-blue" to="/login">
                            {t('AlraedyRegistrated')}
                        </Link>

                        <button
                            className="text-xl px-8 py-[6px] text-white bg-medium-blue"
                            type="submit"
                        >
                            {t('GetRegistrated')}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Registration;
