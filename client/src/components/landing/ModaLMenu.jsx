import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

const ModaLMenu = ({ openModal, setOpenModal }) => {
    return (
        <nav className={`w-full min-h-screen ${openModal ? 'translate-x-0' : 'translate-x-full'} transition-all flex flex-row items-start justify-between fixed bg-landing-form-text z-20 px-4 py-20`}>
            <ul className='flex flex-col items-start gap-5'>
                <li className='text-white'>
                    <a onClick={() => setOpenModal(false)} href="#instruction">Инструкция</a>
                </li>
                <li className='text-white'>
                    <a onClick={() => setOpenModal(false)} href="#about">О нас</a>
                </li>
                <li className='text-white'>
                    <a onClick={() => setOpenModal(false)} href="#faq">FAQ</a>
                </li>
                <li className='text-white'>
                    <a onClick={() => setOpenModal(false)} href="#getintouch">Связаться с нами</a>
                </li>
            </ul>
        </nav>
    )
}

export default ModaLMenu