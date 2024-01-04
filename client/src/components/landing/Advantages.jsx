import React from 'react';
import LaptopImg from '../../assets/landing/laptop_image.png';

import Icon1 from '../../assets/landing/advantages/icon_1.svg';
import Icon2 from '../../assets/landing/advantages/icon_2.svg';
import Icon3 from '../../assets/landing/advantages/icon_3.svg';
import Icon4 from '../../assets/landing/advantages/icon_4.svg';


const Advantages = () => {
    return (
        <section className="advantages w-full mt-10">
            <div className='max-w-7xl mx-auto flex'>
                <div className='flex flex-row justify-between gap-3 grow'>
                    <div className='hidden lg:flex'>
                        <img src={LaptopImg} alt="LaptopImg" />
                    </div>
                    <div className='flex flex-col items-start lg:bg-none bg-adv-mobile-pattern bg-[left_top_-2.5rem] bg-no-repeat bg-cover p-4'>
                        <ul className='flex flex-col items-start gap-14'>
                            <li className='flex flex-row items-start gap-3'>
                                <img src={Icon1} className='w-10 lg:w-20' alt="Icon1" />
                                <div>
                                    <h2 className='text-2xl font-semibold text-landing-headline-mobile'>Мгновенно отслеживайте инциденты</h2>
                                    <p className='mt-1.5 text-landing-description font-light text-lg'>Приложение предоставляет возможность мгновенно отслеживать преступления и чрезвычайные ситуации на карте</p>
                                </div>
                            </li>


                            <li className='flex flex-row items-start gap-3'>
                                <img src={Icon2} className='w-10 lg:w-20' alt="Icon2" />
                                <div>
                                    <h2 className='text-2xl font-semibold text-landing-headline-mobile'>Безопасность данных</h2>
                                    <p className='mt-1.5 text-landing-description font-light text-lg'>Предоставление геолокации абсолютно безопасно, так как личное местоположение нигде не хранится или отслеживается в системе</p>
                                </div>
                            </li>


                            <li className='flex flex-row items-start gap-3'>
                                <img src={Icon3} className='w-10 lg:w-20' alt="Icon3" />
                                <div>
                                    <h2 className='text-2xl font-semibold text-landing-headline-mobile'>Интерактивная карта с мгновенными метками</h2>
                                    <p className='mt-1.5 text-landing-description font-light text-lg'>Пользователи могут легко добавлять метки на карту, отображая места происшествий</p>
                                </div>
                            </li>


                            <li className='flex flex-row items-start gap-3'>
                                <img src={Icon4} className='w-10 lg:w-20' alt="Icon4" />
                                <div>
                                    <h2 className='text-2xl font-semibold text-landing-headline-mobile'>Улучшение приложения</h2>
                                    <p className='mt-1.5 text-landing-description font-light text-lg'>Приложение находится в бета-тестировании, и ваша обратная связь играет ключевую роль в его улучшении</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Advantages