import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Map, ModalWindow, NearMarkers, UserProfile } from '../components'

import { useTranslation } from 'react-i18next';

import { Bars3Icon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { getLocation } from '../utils/getLocation';

const Home = React.memo(() => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [userLocation, setUserLocation] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [selectedMarkerPosition, setSelectedMarkerPosition] = useState(null);

    const [openModal, setOpenModal] = useState(true);
    const [hideModalWindow, setHideModalWindow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const { t } = useTranslation();

    const handleMarkerClick = (position) => {
        setSelectedMarkerPosition(position);
    };

    useEffect(() => {
        getLocation(setUserLocation, dispatch, setLoadingUser);
    }, [dispatch]);

    return (
        <div className="min-h-screen">
            {!hideModalWindow ? (
                <div className='modal__window h-[300px] phone_md:h-[362px]'>
                    <div className='w-full flex justify-center' onClick={() => setHideModalWindow(true)}>
                        <ChevronDownIcon className='w-4 h-4 cursor-pointer' />
                    </div>
                    {openModal ? (
                        <ModalWindow userLocation={userLocation} />
                    ) : (
                        <NearMarkers userLocation={userLocation} onMarkerClick={handleMarkerClick} />
                    )}
                </div>
            ) : (
                <div className='modal__window h-[40px] phone_md:h-[40px]'>
                    <div className='w-full flex justify-center items-center' onClick={() => setHideModalWindow(false)}>
                        <ChevronUpIcon className='w-4 h-4 cursor-pointer' />
                    </div>
                </div>
            )}

            <div className='w-full h-full relative'>
                <Bars3Icon onClick={() => setShowMenu(prev => !prev)} className='absolute z-40 w-8 h-w-8 right-3 top-3 cursor-pointer' />
                <Map userLocation={userLocation} selectedMarkerPosition={selectedMarkerPosition} setOpenModal={setOpenModal} />
            </div>


            {loadingUser ? (
                <p>{t('LoadingData')}</p>
            ) : (
                user && <UserProfile user={user} showMenu={showMenu} setShowMenu={setShowMenu} />
            )};
        </div>
    )
});

export default Home