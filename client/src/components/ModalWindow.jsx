import React, { useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { createMarker } from '../redux/features/markerSlice';

import { useTranslation } from 'react-i18next';

import send from '../assets/main/send.svg';
import redEllipse from '../assets/ellipses/red_ellipse.svg';
import blueEllipse from '../assets/ellipses/blue_ellipse.svg';
import greenEllipse from '../assets/ellipses/green_ellipse.svg';
import purpleEllipse from '../assets/ellipses/purple_ellipse.svg';
import yellowEllipse from '../assets/ellipses/yellow_ellipse.svg';

import DangerItem from './DangerItem';

const ModalWindow = ({ userLocation }) => {
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [metresWindow, setMetresWindow] = useState();

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const imagePlaceRef = useRef(null);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();

        const selectedFile = e.target.files[0];
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }

        reader.onload = (readerEvent) => {
            if (selectedFile.type.includes("image")) {
                setImagePreview(readerEvent.target.result);
            }
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append('category', category);
            data.append('description', description || "");
            data.append('position', JSON.stringify(userLocation));
            data.append('metres', metresWindow);
            if (selectedFile) {
                data.append('image', selectedFile);
            }

            // console.log('Data to be sent:', Object.fromEntries(data.entries()));
            dispatch(createMarker(data));

            setSelectedFile(null);

            setCategory('');
            setDescription('');
            setMetresWindow();

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(`send error - ${error}`);
        }
    };

    return (
        <div>
            <div className='mx-auto w-[90%]'>
                <h1 className='font-medium text-xs phone_md:text-xl'>
                    {t('Report')}
                </h1>

                <form
                    onSubmit={e => {
                        e.preventDefault();
                    }}
                    className='flex flex-col gap-3 text-left items-start mt-1'
                >
                    <div className='flex flex-row justify-between w-full'>
                        <div className='flex flex-col gap-2 text-sm phone_md:text-base w-full'>

                            <DangerItem
                                categoryItem='Угроза жизни'
                                categoryText={t('DangerLife')}
                                isSelected={category === 'Угроза жизни'}
                                setCategory={setCategory}
                                iconSrc={redEllipse}
                            />

                            <DangerItem
                                categoryItem='Неадекватное поведение'
                                categoryText={t('CrazyBehavior')}
                                isSelected={category === 'Неадекватное поведение'}
                                setCategory={setCategory}
                                iconSrc={yellowEllipse}
                            />

                            <DangerItem
                                categoryItem='Домагательства'
                                categoryText={t('Harassment')}
                                isSelected={category === 'Домагательства'}
                                setCategory={setCategory}
                                iconSrc={purpleEllipse}
                            />

                            <DangerItem
                                categoryItem='Проблемы с инфраструктурой'
                                categoryText={t('Infrastructure')}
                                isSelected={category === 'Проблемы с инфраструктурой'}
                                setCategory={setCategory}
                                iconSrc={blueEllipse}
                            />

                            <DangerItem
                                categoryItem='Авария'
                                categoryText={t('CarIncident')}
                                isSelected={category === 'Авария'}
                                setCategory={setCategory}
                                iconSrc={greenEllipse}
                            />
                        </div>

                        <div className='flex flex-col items-end justify-between gap-6'>
                            <button onClick={() => imagePlaceRef.current.click()} className='text-xs phone_md:text-base text-end'>{t('AddImage')}</button>
                            <input ref={imagePlaceRef} type="file" onChange={handleFileChange} className='hidden' accept='image/*' />
                            {imagePreview != null && <img className='w-10 h-auto rounded-md' src={imagePreview} alt="imagePreview" />}
                        </div>
                    </div>

                    <div>
                        <p className='text-xs phone_md:text-sm mt-1'>{t('WhereIsDangerous')}</p>
                        <div className='mt-2 flex gap-5'>
                            <label htmlFor="one_hundred" className='flex items-center gap-1'>
                                <input className='w-3 phone_md:w-5' onClick={() => setMetresWindow(20)} type="radio" name="distance" id="one_hundred" />
                                <span className='text-xs phone_md:text-base'>20</span>
                            </label>
                            <label htmlFor="two_hundreds" className='flex items-center gap-1'>
                                <input className='w-3 phone_md:w-5' onClick={() => setMetresWindow(50)} type="radio" name="distance" id="two_hundreds" />
                                <span className='text-xs phone_md:text-base'>50</span>
                            </label>
                            <label htmlFor="three_hundreds" className='flex items-center gap-1'>
                                <input className='w-3 phone_md:w-5' onClick={() => setMetresWindow(100)} type="radio" name="distance" id="three_hundreds" />
                                <span className='text-xs phone_md:text-base'>100</span>
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
                            className='absolute mt-4 right-7 phone_md:right-10'
                            onClick={submitHandler}
                        >
                            <img src={send} alt="send__button" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalWindow;
