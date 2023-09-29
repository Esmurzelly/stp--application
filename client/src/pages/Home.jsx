import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, getMe } from '../redux/features/authSlice';
import { toast } from 'react-toastify';
import Map from '../components/Map';
import { getAllMarkers } from '../redux/features/markerSlice';
import ModalWindow from '../components/ModalWindow';
import { Link } from 'react-router-dom';
import NearMarkers from '../components/NearMarkers';
import { useMapEvent } from 'react-leaflet';
import UserProfile from '../components/UserProfile';
import { Bars3Icon } from '@heroicons/react/24/solid';


const Home = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [userLocation, setUserLocation] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [selectedMarkerPosition, setSelectedMarkerPosition] = useState(null);
    const [openModal, setOpenModal] = useState(true);

    const [showMenu, setShowMenu] = useState(false);

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
        <div>
            {openModal ? (
                <ModalWindow userLocation={userLocation} />
            ) : (
                <NearMarkers userLocation={userLocation} onMarkerClick={handleMarkerClick} />
            )}

            <div className='w-full h-full relative'>
                <Bars3Icon onClick={() => setShowMenu(prev => !prev)} className='absolute z-40 w-8 h-w-8 right-3 top-3' />
                <Map userLocation={userLocation} selectedMarkerPosition={selectedMarkerPosition} setOpenModal={setOpenModal} />
            </div>


            {loadingUser ? (
                <p>Loading user data...</p>
            ) : (
                user && (
                    <UserProfile user={user} showMenu={showMenu} setShowMenu={setShowMenu} />
                )
            )}
        </div>
    )
}

export default Home