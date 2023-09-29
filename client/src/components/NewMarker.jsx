import React, { useState } from 'react'
import axios from '../utils/axios';
import { Popup, Circle, LayersControl, FeatureGroup, Marker } from 'react-leaflet';
import L, { map } from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { removeMarker } from '../redux/features/markerSlice';

import redMarker from '../assets/markers/red_marker.svg';
import blueMarker from '../assets/markers/blue_marker.svg';
import greenMarker from '../assets/markers/green_marker.svg';
import purpleMarker from '../assets/markers/purple_marker.svg';
import yellowMarker from '../assets/markers/yellow_marker.svg';
import userMarker from '../assets/markers/user_marker.svg';

import Moment from 'react-moment';

const NewMarker = ({ _id, category, description, position, metres, author, createdAt }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [isFront, setIsFront] = useState(false);

    const handleRemoveMarker = async () => {
        try {
            const response = await axios.delete(`/markers/${_id}`);

            if (response.status === 200) {
                dispatch(removeMarker(_id))
            }

            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error("You are not authorized to delete this marker");
            } else {
                console.error("An error occurred:", error);
            }
        }
    }

    const handleMarkerClick = () => {
        setIsFront(true);
    }

    return (
        <LayersControl.Overlay
            checked={true}
            name={category}
        >
            <FeatureGroup pathOptions={{
                color: category === "Угроза жизни" ? "#FF0000" :
                    category === "Неадекватное поведение" ? "#DFE336" :
                        category === "Домагательства" ? "#7D52B4" :
                            category === "Проблемы с инфраструктурой" ? "#00E0FF" :
                                category === "Авария" ? "#00FF47" :
                                    "#000000",
            }}>
                <Popup>
                    <div className='w-full h-full flex flex-col gap-2 items-start'>
                        <span>Категория: {category}</span>
                        <span className='break-words'> Описание: {description}</span>
                        <span>Метка была поставлена: <Moment date={createdAt} format='D.MM.YYYY, HH:mm' /> <br /></span>

                        {user && user._id === author && (
                            <button className='bg-light-blue text-white px-2 py-1 rounded-md' onClick={handleRemoveMarker}>Удалить</button>
                        )}
                    </div>

                </Popup>
                <Circle center={position} radius={metres} />

                <Marker
                    position={position}
                    eventHandlers={{
                        click: () => {
                            handleMarkerClick();
                        }
                    }}
                    icon={new L.icon({
                        iconUrl:
                            category === "Угроза жизни" ? redMarker :
                                category === "Неадекватное поведение" ? yellowMarker :
                                    category === "Домагательства" ? purpleMarker :
                                        category === "Проблемы с инфраструктурой" ? blueMarker :
                                            category === "Авария" ? greenMarker :
                                                redMarker,
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                    })}
                    zIndexOffset={isFront ? 1000 : 0}
                />
            </FeatureGroup>
        </LayersControl.Overlay>
    )
}

export default NewMarker