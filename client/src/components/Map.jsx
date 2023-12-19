import React, { useCallback, useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAllMarkers } from '../redux/features/markerSlice';

import NewMarker from './NewMarker';

import { useTranslation } from 'react-i18next';

import L from 'leaflet';
import { MapContainer, Popup, TileLayer, Marker, LayersControl } from 'react-leaflet';

import userMarker from '../assets/markers/user_marker.svg';
import myGeo from '../assets/main/myGeo.svg';
import showMarkers from '../assets/main/showMarkers.svg';
import LoaderComponent from './LoaderComponent';

import Loader from '@trendmicro/react-loader';
import '@trendmicro/react-loader/dist/react-loader.css';


const Map = React.memo(({ userLocation, selectedMarkerPosition, setOpenModal }) => {
    const dispatch = useDispatch();
    const { currentMarkers, loading } = useSelector(state => state.markers);
    const mapRef = useRef();

    const { t } = useTranslation();

    const fetchMarkers = useCallback(async () => {
        try {
            dispatch(getAllMarkers());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchMarkers();
    }, [dispatch, fetchMarkers]);


    // request each 1 second - rejected
    // useEffect(() => {
    //     fetchMarkers();

    //     const intervalId = setInterval(fetchMarkers, 1000);

    //     return () => {
    //         clearInterval(intervalId); // Очистка интервала при размонтировании
    //     };
    // }, [fetchMarkers]);

    useEffect(() => {
        if (mapRef.current && selectedMarkerPosition) {
            mapRef.current.setView(selectedMarkerPosition, mapRef.current.getZoom());
        }
    }, [selectedMarkerPosition]);

    const backToMe = () => {
        if (mapRef.current && userLocation) {
            mapRef.current.setView(userLocation, mapRef.current.getZoom())
        }
    }

    if (userLocation === null) {
        return (
            <LoaderComponent />
        )
    }

    return (
        <div className='min-h-screen'>
            <div className='absolute z-20 top-[30%] right-2 flex flex-col gap-3'>
                <div onClick={() => backToMe()}>
                    <img
                        className='drop-shadow-xl cursor-pointer'
                        src={myGeo}
                        alt="myGeo"
                    />
                </div>

                <div>
                    <img
                        onClick={() => setOpenModal(prev => !prev)}
                        className='drop-shadow-xl cursor-pointer'
                        src={showMarkers}
                        alt="showMarkers"
                    />
                </div>
            </div>

            {loading && (
                <div className='w-full min-h-screen bg-slate-500 absolute z-50 opacity-80'>
                    <p className='text-center w-full text-lg px-3 text-white absolute z-20 opacity-100 top-[15%]'>
                        {t('LoadingNotReoload')}
                    </p>
                    <div className='absolute top-[25%] left-2/4'>
                        <Loader size="md" className="component text-black"></Loader>
                    </div>
                </div>
            )}


            <MapContainer ref={mapRef} center={userLocation || selectedMarkerPosition} zoom={13} className='z-10 min-h-screen w-full relative'>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />

                <Marker position={userLocation} icon={new L.icon({
                    iconUrl: userMarker,
                    iconSize: [40, 40],
                    iconAnchor: [16, 32],
                })}>
                    <Popup>{t('YourLocation')}</Popup>
                </Marker>

                <LayersControl position='bottomleft'>
                    {currentMarkers?.map((mapEl) => (
                        <NewMarker
                            key={mapEl._id}
                            _id={mapEl._id}
                            category={mapEl.category}
                            description={mapEl.description}
                            position={mapEl.position}
                            metres={mapEl.metres || 20}
                            author={mapEl.author}
                            createdAt={mapEl.createdAt}
                            image={mapEl?.image}
                        />
                    ))}
                </LayersControl>
            </MapContainer>

        </div>

    )
});

export default Map