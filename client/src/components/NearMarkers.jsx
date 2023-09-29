import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import comment from '../assets/main/comment.svg';

import redEllipse from '../assets/ellipses/red_ellipse.svg';
import blueEllipse from '../assets/ellipses/blue_ellipse.svg';
import greenEllipse from '../assets/ellipses/green_ellipse.svg';
import purpleEllipse from '../assets/ellipses/purple_ellipse.svg';
import yellowEllipse from '../assets/ellipses/yellow_ellipse.svg';

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радиус Земли в километрах
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Разница широт в радианах
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Разница долгот в радианах

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c * 1000; // Расстояние в метрах

    return distance;
}

const NearMarkers = ({ userLocation, onMarkerClick }) => {
    const { currentMarkers } = useSelector(state => state.markers);
    const [distance, setDistance] = useState([]);

    useEffect(() => {
        if (userLocation && userLocation.length === 2) {
            const distances = currentMarkers.map(marker => {
                const distanceMarker = calculateDistance(
                    userLocation[0],
                    userLocation[1],
                    marker.position[0],
                    marker.position[1]
                );
                return distanceMarker.toFixed(0);
            });

            distances.sort((a, b) => a.distance - b.distance);

            setDistance(distances);
        }
    }, [userLocation, currentMarkers]);

    const markerCount = distance.filter(dist => dist <= 10000).length;


    function getMarkerCountText(markerCount) {
        if (markerCount === 1) {
            return `${markerCount} метка рядом`;
        } else if (markerCount >= 2 && markerCount <= 4) {
            return `${markerCount} метки рядом`;
        } else {
            return `${markerCount} меток рядом`;
        }
    }

    return (
        <div
            className="bg-white shadow-upShadow py-2 h-[280px] phone_md:h-[362px] flex flex-col absolute bottom-0 left-0 z-50 w-full text-center"

        >
            <div className='mx-auto w-[80%] overflow-scroll'>
                <h1 className='text-lg'>
                    <span className='text-light-blue font-medium'>
                        {getMarkerCountText(markerCount)}
                    </span>
                </h1>
                <ul className="flex flex-col gap-2 items-start mt-3">
                    {currentMarkers.map((marker, index) => {
                        if (distance[index] <= 10000) {
                            return (
                                <li
                                    className="px-[9px] py-[7px] w-full bg-[#F6F6F6] rounded-lg"
                                    key={marker._id}
                                    onClick={() => {
                                        onMarkerClick(marker.position);
                                    }}
                                >
                                    <div className="grid grid-cols-4 grid-rows-2 gap-0">
                                        <div className="grid-item col-span-3">
                                            <h1 className='text-left'>{marker.category} </h1>
                                        </div>
                                        <div className="grid-item col-start-4 col-end-5 justify-center">
                                            <div className='flex gap-1 justify-end items-start'>
                                                <p className='text-xs text-right'>{distance[index]} м</p>
                                                <img src={
                                                    marker.category === "Угроза жизни" ? redEllipse :
                                                        marker.category === "Неадекватное поведение" ? yellowEllipse :
                                                            marker.category === "Домагательства" ? purpleEllipse :
                                                                marker.category === "Проблемы с инфраструктура" ? blueEllipse :
                                                                    marker.category === "Авария" ? greenEllipse :
                                                                        redEllipse
                                                } alt="" />
                                            </div>
                                        </div>
                                        <div className="grid-item row-start-2 row-end-3 col-span-4">
                                            <p className='flex gap-2 text-xs text-left break-words'>
                                                <img className='w-3' src={comment} alt="comment" />
                                                {marker.description}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            );
                        } else {
                            <p>Меток поблизости нет</p>;
                        }
                    })}
                </ul>
            </div>

        </div>
    );
};

export default NearMarkers;
