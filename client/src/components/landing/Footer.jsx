import React from 'react';
import InstagramIcon from '../../assets/landing/social_network/instagram.png'
import TelegramIcon from '../../assets/landing/social_network/telegram.png'
import VkIcon from '../../assets/landing/social_network/vk.png'

const Footer = () => {
    return (
        <div className='w-full h-full mt-10 p-4 bg-bottom-pattern bg-no-repeat bg-cover'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-row items-center justify-between text-white xl:mt-24 2xl:mt-36'>
                    <div className='hidden lg:flex flex-col items-start gap-3'>
                        <h3 className='text-3xl'>О нас</h3>
                        <div className='flex flex-col items-start gap-2'>
                            <p>Ваша безопасность - наш приоритет . Наше приложения предназначено для отслеживания преступлений и создания безопасной среды</p>
                            <p>В разработке принимали участие: </p>
                            <ul className='px-2'>
                                <li>- Эсмурзиев Адам  - разработка приложения приложения</li>
                                <li>- Шульский Тимофей - Разработка дизайна приложения</li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-start xl:items-end gap-3 my-28'>
                        <div className='w-full lg:max-w-[50%]'>
                            <h3 className='text-2xl '>Свяжитесь с нами</h3>
                            <ul className='flex flex-col items-start gap-3 mt-4'>
                                <li className='flex items-center gap-4'>
                                    <a className='flex items-center gap-3' href="https://www.instagram.com/esmurzelly/">
                                        <img className='w-7' src={InstagramIcon} alt="Instagram" />
                                        <span>Instagram</span>
                                    </a>

                                </li>
                                <li className='flex items-center gap-4'>
                                    <a className='flex items-center gap-3' href="https://t.me/Esmurzelly">
                                        <img className='w-7' src={TelegramIcon} alt="Telegram" />
                                        <span>Telegram</span>
                                    </a>

                                </li>
                                <li className='flex items-center gap-4'>
                                    <a className='flex items-center gap-3' href="https://vk.com/a_lyanov">
                                        <img className='w-7' src={VkIcon} alt="VK" />
                                        <span>VK</span>
                                    </a>

                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>
            <hr className='w-full mt-4 mx-auto' />
            <p className='text-xl text-center text-white mt-4'>© 2023 BeSafeApp.
                Все права защищены</p>
        </div>
    )
}

export default Footer