import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/main/Logo.svg'
import Phone from '../../assets/landing/iphone_image.png'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import ModaLMenu from './ModaLMenu'

const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isTopOfPage, setIsTopOfPage] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) setIsTopOfPage(true);
            else setIsTopOfPage(false);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    return (
        <div className='w-full flex flex-col relative'>
            <header className='p-4 flex flex-col bg-top-pattern bg-[center_top_-7rem] bg-no-repeat bg-cover'>
                <div className='max-w-7xl mx-auto'>
                    <div className={`flex flex-row justify-between items-center w-full px-5 py-2 ${isTopOfPage ? "bg-transparent" : "bg-landing-form-text"} opacity-95 fixed top-0 left-0 z-50`}>
                        <img src={Logo} alt="logo" />

                        {openModal ? (
                            <XMarkIcon onClick={() => setOpenModal(!openModal)} className="text-white cursor-pointer w-8 h-w-8" />
                        ) : (
                            <Bars3Icon onClick={() => setOpenModal(!openModal)} className="text-white cursor-pointer w-8 h-w-8" />
                        )}
                    </div>

                    <div className='flex flex-col lg:flex-row justify-start lg:justify-between items-center mt-20'>
                        <div className='flex flex-col items-start'>
                            <h1 className='uppercase text-2xl font-bold text-landing-headline leading-10'>Ваша безопасность - <br /> наш приоритет</h1>
                            <p className='uppercase text-base text-landing-headline mt-2 font-normal tracking-[0.6rem]'>для всех устройств</p>
                            <h2 className='uppercase text-2xl text-landing-headline font-semibold mt-8'>Сохраните свою безопасность</h2>
                            <p className='text-base text-landing-description font-normal mt-8'>Наше приложение предназначено для трекинга преступлений и поможет вам быстро отследить инциденты на карте.</p>
                            <Link to={'/login'} className='hidden lg:block text-white p-4 text-center rounded-3xl w-[200px] bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 mt-20 lg:static lg:mt-5 relative top-24 left-28'>Подключиться</Link>
                        </div>
                        <div className='w-full mt-5 flex mb-80 lg:mb-0 lg:justify-end lg:items-center'>
                            <img className='w-[174px] absolute xl:static z-10' src={Phone} alt="phone" />
                            <Link to={'/login'} className='lg:hidden text-white p-4 text-end rounded-3xl w-[200px] bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 relative top-24 left-28'>Подключиться</Link>
                        </div>
                    </div>
                </div>

            </header>

            <ModaLMenu openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}

export default Header