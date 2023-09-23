import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid';
import L from 'leaflet';
import redMarker from '../assets/markers/red_marker.png';
import blueMarker from '../assets/markers/blue_marker.png';
import greenMarker from '../assets/markers/green_marker.png';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMarkers } from '../redux/features/markerSlice';
import { useCallback, useRef } from 'react';

const Map = () => {
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const { markers, currentMarkers } = useSelector(state => state.markers);

    const [newMarkerPosition, setNewMarkerPosition] = useState(null);


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

    console.log('current markers', currentMarkers);

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
    }, []);

    if (userLocation === null) {
        return <div>Loading...</div>;
    }

    return (
        <MapContainer center={userLocation} zoom={13} style={{ minHeight: '700px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />

            <Marker position={userLocation} icon={new L.icon({
                iconUrl: redMarker,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
            })}>
                <Popup>A sample marker on the map.</Popup>
            </Marker>

            {/* {newMarkerPosition && (
                <Marker position={newMarkerPosition}>
                    <Popup>Маркер добавлен по клику</Popup>
                </Marker>
            )} */}

            {currentMarkers.map((mapEl) => (
                <Marker key={mapEl._id} position={mapEl.position} icon={new L.icon({
                    iconUrl:
                        mapEl.category === 'Убийство' ? redMarker :
                            mapEl.category === 'Авария' ? blueMarker :
                                mapEl.category === 'Кража' ? greenMarker : blueMarker,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                })}>
                    <Popup>
                        Название: {mapEl.markerName} <br />
                        Категория: {mapEl.category} <br />
                        Описание: {mapEl.description}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>

    )
}

export default Map