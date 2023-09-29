import { MapContainer, Popup, TileLayer, Marker, LayerGroup, Circle, LayersControl, FeatureGroup, Rectangle } from 'react-leaflet';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid';
import L, { map } from 'leaflet';
// import redMarker from '../assets/markers/red_marker.png';
// import blueMarker from '../assets/markers/blue_marker.png';
// import greenMarker from '../assets/markers/green_marker.png';

import redMarker from '../assets/markers/red_marker.svg';
import blueMarker from '../assets/markers/blue_marker.svg';
import greenMarker from '../assets/markers/green_marker.svg';
import purpleMarker from '../assets/markers/purple_marker.svg';
import yellowMarker from '../assets/markers/yellow_marker.svg';
import userMarker from '../assets/markers/user_marker.svg';


import myGeo from '../assets/main/myGeo.svg';
import showMarkers from '../assets/main/showMarkers.svg';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMarkers } from '../redux/features/markerSlice';
import { useCallback, useRef } from 'react';
import NewMarker from './NewMarker';

const Map = ({ userLocation, selectedMarkerPosition, setOpenModal }) => {
    const dispatch = useDispatch();
    const { currentMarkers } = useSelector(state => state.markers);
    const mapRef = useRef();

    const fetchMarkers = useCallback(async () => {
        try {
            dispatch(getAllMarkers());
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        fetchMarkers()
    }, [dispatch]);

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
        return <div>Loading...</div>;
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
                    <Popup>Ваше местоположение</Popup>
                </Marker>

                <LayersControl position='bottomleft'>
                    {currentMarkers.map((mapEl) => (
                        <NewMarker
                            key={mapEl._id}
                            _id={mapEl._id}
                            category={mapEl.category}
                            description={mapEl.description}
                            position={mapEl.position}
                            metres={mapEl.metres || 20}
                            author={mapEl.author}
                            createdAt={mapEl.createdAt}
                        />
                    ))}
                </LayersControl>
            </MapContainer>

        </div>

    )
}

export default Map