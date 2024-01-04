import React from 'react'
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageInstuction from '../../assets/landing/instraction/1.jpg';
import ImageInstuction2 from '../../assets/landing/instraction/2.jpg';
import ImageInstuction3 from '../../assets/landing/instraction/3.jpg';
import ImageInstuction4 from '../../assets/landing/instraction/4.jpg';
import ImageInstuction5 from '../../assets/landing/instraction/5.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Instuction = () => {
    const widthBrowser = window.innerWidth;

    return (
        <div id='instruction' className='w-full h-full my-10 px-4'>
            <div className="text-center">
                <h1 className='text-landing-headline text-4xl font-light tracking-widest'>Инструкция по применению</h1>
                <p className='mt-7 text-landing-gray text-xl'>Это проще, чем Вы думатете :) </p>
                <p className='mt-5 text-landing-gray text-xl'>Наведите  / кликните по картинке, чтобы прочитать описание к каждому шагу</p>
            </div>

            <div className="slider w-full mt-5">
                <Swiper
                    modules={[Pagination, A11y]}
                    spaceBetween={50}
                    slidesPerView={widthBrowser >= 1280 ? 4 : widthBrowser >= 1024 ? 3 : widthBrowser >= 640 ? 2 : 1}
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide>
                        <div className='h-full w-full relative group'>
                            <img src={ImageInstuction} className='rounded-md cursor-pointer' alt="ImageInstuction" />
                            <div className='absolute bg-medium-blue opacity-95 px-5 scale-0 group-hover:scale-100 group-active:scale-100 top-0 left-0 pt-[50%] w-full h-full text-black text-center'>
                                <div className="h-3 text-3xl text-left text-white">“</div>
                                <p className="px-4 text-sm text-center text-white">
                                    Для начала разрешите приложению отслеживать ваше местоположение, что бы в случае необходимости Вы смогли поставить маркер ЧП и посмотреть какие происшествия Вас окружают.
                                </p>
                                <div className="h-3 text-3xl text-right text-white">”</div>
                            </div>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='h-full w-full relative group cursor-pointer'>
                            <img src={ImageInstuction2} className='rounded-md cursor-pointer' alt="ImageInstuction" />
                            <div className='absolute bg-medium-blue opacity-95 px-5 scale-0 group-hover:scale-100 group-active:scale-100 top-0 left-0 pt-[50%] w-full h-full text-black text-center'>
                                <div className="h-3 text-3xl text-left text-white">“</div>
                                <p className="px-4 text-sm text-center text-white">
                                    Перед Вами открывается карта с Вашим местоположением и форма, благодаря которой можно зафиксировать ЧП.
                                </p>
                                <div className="h-3 text-3xl text-right text-white">”</div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='h-full w-full relative group cursor-pointer'>
                            <img src={ImageInstuction3} className='rounded-md cursor-pointer' alt="ImageInstuction" />
                            <div className='absolute bg-medium-blue opacity-95 px-5 scale-0 group-hover:scale-100 group-active:scale-100 top-0 left-0 pt-[50%] w-full h-full text-black text-center'>
                                <div className="h-3 text-3xl text-left text-white">“</div>
                                <p className="px-4 text-sm text-center text-white">
                                    В форме можно указать категорию ЧП, радиус происшествия, описание и фотографию (фото и описание указываются по умолчанию).
                                </p>
                                <div className="h-3 text-3xl text-right text-white">”</div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='h-full w-full relative group cursor-pointer'>
                            <img src={ImageInstuction4} className='rounded-md cursor-pointer' alt="ImageInstuction" />
                            <div className='absolute bg-medium-blue opacity-95 px-5 scale-0 group-hover:scale-100 group-active:scale-100 top-0 left-0 pt-[50%] w-full h-full text-black text-center'>
                                <div className="h-3 text-3xl text-left text-white">“</div>
                                <p className="px-4 text-sm text-center text-white">
                                    Собственный маркер можно удалить в любое время. Удаление маркера возможно только пользователем, который зафиксировал и администрацией сервиса.
                                </p>
                                <div className="h-3 text-3xl text-right text-white">”</div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='h-full w-full relative group cursor-pointer'>
                            <img src={ImageInstuction5} className='rounded-md cursor-pointer' alt="ImageInstuction" />
                            <div className='absolute bg-medium-blue opacity-95 px-5 scale-0 group-hover:scale-100 group-active:scale-100 top-0 left-0 pt-[50%] w-full h-full text-black text-center'>
                                <div className="h-3 text-3xl text-left text-white">“</div>
                                <p className="px-4 text-sm text-center text-white">
                                    Так же, есть возможность поменять свои данные в личном кабинете. Попасть в него можно, кликнув на знак меню (три полоски) в верхнем правом углу.
                                </p>
                                <div className="h-3 text-3xl text-right text-white">”</div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Instuction