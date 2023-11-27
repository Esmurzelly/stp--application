import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../redux/features/authSlice';

import Map from '../components/Map';
import ModalWindow from '../components/ModalWindow';
import NearMarkers from '../components/NearMarkers';
import UserProfile from '../components/UserProfile';

import { useTranslation } from 'react-i18next';

import { Bars3Icon } from '@heroicons/react/24/solid';

const Home = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [userLocation, setUserLocation] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [selectedMarkerPosition, setSelectedMarkerPosition] = useState(null);
    const [openModal, setOpenModal] = useState(true);

    const [showMenu, setShowMenu] = useState(false);

    const { t } = useTranslation();

    const handleMarkerClick = (position) => {
        setSelectedMarkerPosition(position);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude])
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

        dispatch(getMe())
        setLoadingUser(false);
    }, []);

    return (
        <div className="min-h-screen">
            <div className='bg-white shadow-upShadow py-2 h-[280px] phone_md:h-[362px] flex flex-col fixed bottom-0 left-0 z-50 w-full text-center'>
                {openModal ? (
                    <ModalWindow userLocation={userLocation} />
                ) : (
                    <NearMarkers userLocation={userLocation} onMarkerClick={handleMarkerClick} />
                )}
            </div>


            <div className='w-full h-full relative'>
                <Bars3Icon onClick={() => setShowMenu(prev => !prev)} className='absolute z-40 w-8 h-w-8 right-3 top-3' />
                <Map userLocation={userLocation} selectedMarkerPosition={selectedMarkerPosition} setOpenModal={setOpenModal} />
            </div>


            {loadingUser ? (
                <p>{t('LoadingData')}</p>
            ) : (
                user && (
                    <UserProfile user={user} showMenu={showMenu} setShowMenu={setShowMenu} />
                )
            )}
        </div>
    )
}

export default Home