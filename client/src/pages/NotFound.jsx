import React from 'react';

import { useNavigate, Link } from 'react-router-dom';

import logo from '../assets/main/Logo.svg';
import back from '../assets/main/back.svg';
import pageError from '../assets/main/pageError.svg';
import { ChangeLanguage } from '../components';

import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <section
            className='bg-white py-3 px-5 text-2xl font-roboto font-extralight w-full flex flex-col justify-center items-start min-h-screen'>

            <div className='w-full flex justify-between items-start'>
                <div className="logo">
                    <img className='w-16 h-16' src={logo} alt="logo" />
                </div>

                <ChangeLanguage />
            </div>

            <div className='flex flex-1 flex-col gap-7 text-center justify-center items-center h-full w-full pb-28 text-light-gray text-4xl'>
                <h1>{t('Oops')}</h1>

                <img className='w-52' src={pageError} alt="avatar_registration" />

                <p className='text-light-gray text-lg'>{t('NotExisted')}</p>
            </div>

            <Link
                to={navigate(-1)}
            >
                <img className='w-10' src={back} alt="backImage" />
            </Link>
        </section>
    )
}

export default NotFound;