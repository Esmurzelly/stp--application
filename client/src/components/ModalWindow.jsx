import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { createMarker } from '../redux/features/markerSlice';

import { useTranslation } from 'react-i18next';

import send from '../assets/main/send.svg';
import redEllipse from '../assets/ellipses/red_ellipse.svg';
import blueEllipse from '../assets/ellipses/blue_ellipse.svg';
import greenEllipse from '../assets/ellipses/green_ellipse.svg';
import purpleEllipse from '../assets/ellipses/purple_ellipse.svg';
import yellowEllipse from '../assets/ellipses/yellow_ellipse.svg';

import { CheckIcon } from '@heroicons/react/24/solid';

const ModalWindow = ({ userLocation }) => {
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [metresWindow, setMetresWindow] = useState();

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const submitHandler = () => {
        try {
            const data = new FormData();
            data.append('category', category);
            data.append('description', description || "Описание отсутсвует");
            data.append('position', JSON.stringify(userLocation));
            data.append('metres', metresWindow);

            console.log('Data to be sent:', Object.fromEntries(data.entries()));
            dispatch(createMarker(data));

            setCategory('');
            setDescription('');

            window.location.reload();
        } catch (error) {
            console.log(`send error - ${error}`);
        }
    };

    return (
        <div
            className="bg-white shadow-upShadow py-2 h-[280px] phone_md:h-[362px] flex flex-col absolute bottom-0 left-0 z-50 w-full text-center"
        >
            <div className='mx-auto w-[80%]'>
                <h1 className='font-medium text-xs phone_md:text-xl'>
                    {t('Report')}
                </h1>

                <form
                    onSubmit={e => {
                        e.preventDefault();
                    }}
                    className='flex flex-col gap-3 text-left items-start mt-1 phone_md:mt-5'
                >
                    <div className='flex flex-col gap-2 text-sm phone_md:text-base'>
                        <div
                            className='flex gap-1 items-center cursor-pointer'
                            onClick={() => setCategory('Угроза жизни')}
                        >
                            <img className='w-3 phone_md:w-4' src={redEllipse} alt="redEllipse" />
                            <span className='text-xs phone_md:text-base'>{t('DangerLife')}</span>
                            {category === 'Угроза жизни' && <CheckIcon className='w-3 h-3' />}
                        </div>

                        <div
                            className='flex gap-1 items-center cursor-pointer'
                            onClick={() => setCategory('Неадекватное поведение')}
                        >
                            <img className='w-3 phone_md:w-4' src={yellowEllipse} alt="yellowEllipse" />
                            <span className='text-xs phone_md:text-base'>{t('CrazyBehavior')}</span>
                            {category === 'Неадекватное поведение' && <CheckIcon className='w-3 h-3' />}
                        </div>

                        <div
                            className='flex gap-1 items-center cursor-pointer'
                            onClick={() => setCategory('Домагательства')}
                        >
                            <img className='w-3 phone_md:w-4' src={purpleEllipse} alt="purpleEllipse" />
                            <span className='text-xs phone_md:text-base'>{t('Harassment')}</span>
                            {category === 'Домагательства' && <CheckIcon className='w-3 h-3' />}
                        </div>

                        <div
                            className='flex gap-1 items-center cursor-pointer'
                            onClick={() => setCategory('Проблемы с инфраструктурой')}
                        >
                            <img className='w-3 phone_md:w-4' src={blueEllipse} alt="blueEllipse" />
                            <span className='text-xs phone_md:text-base'>{t('Infrastructure')}</span>
                            {category === 'Проблемы с инфраструктурой' && <CheckIcon className='w-3 h-3' />}
                        </div>

                        <div
                            className='flex gap-1 items-center cursor-pointer'
                            onClick={() => setCategory('Авария')}
                        >
                            <img className='w-3 phone_md:w-4' src={greenEllipse} alt="greenEllipse" />
                            <span className='text-xs phone_md:text-base'>{t('CarIncident')}</span>
                            {category === 'Авария' && <CheckIcon className='w-3 h-3' />}
                        </div>
                    </div>


                    <div>
                        <p className='text-xs phone_md:text-sm mt-1'>{t('WhereIsDangerous')}</p>
                        <div className='mt-2 flex gap-5'>
                            <label htmlFor="one_hundred" className='flex items-center gap-1'>
                                <input className='w-3 phone_md:w-5' onClick={() => setMetresWindow(50)} type="radio" name="distance" id="one_hundred" />
                                <span className='text-xs phone_md:text-base'>50</span>
                            </label>
                            <label htmlFor="two_hundreds" className='flex items-center gap-1'>
                                <input className='w-3 phone_md:w-5' onClick={() => setMetresWindow(100)} type="radio" name="distance" id="two_hundreds" />
                                <span className='text-xs phone_md:text-base'>100</span>
                            </label>
                            <label htmlFor="three_hundreds" className='flex items-center gap-1'>
                                <input className='w-3 phone_md:w-5' onClick={() => setMetresWindow(200)} type="radio" name="distance" id="three_hundreds" />
                                <span className='text-xs phone_md:text-base'>200</span>
                            </label>
                        </div>
                    </div>

                    <div className='w-full'>
                        <textarea
                            className='relative resize-none rounded-md w-full h-[60px] bg-[#F6F6F6] py-2 px-1'
                            placeholder={t('DesctibeWhatYouveSeen')}
                            onChange={e => setDescription(e.target.value)}
                        >

                        </textarea>

                        <button
                            type="submit"
                            className='absolute top-56 phone_md:top-[305px] right-12'
                            onClick={submitHandler}
                        >
                            <img src={send} alt="send" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalWindow;
