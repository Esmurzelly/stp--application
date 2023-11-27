import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { calculateDistance } from '../utils/calculateDistance';

import comment from '../assets/main/comment.svg';
import redEllipse from '../assets/ellipses/red_ellipse.svg';
import blueEllipse from '../assets/ellipses/blue_ellipse.svg';
import greenEllipse from '../assets/ellipses/green_ellipse.svg';
import purpleEllipse from '../assets/ellipses/purple_ellipse.svg';
import yellowEllipse from '../assets/ellipses/yellow_ellipse.svg';

const NearMarkers = ({ userLocation, onMarkerClick }) => {
    const { currentMarkers } = useSelector(state => state.markers);
    const [distance, setDistance] = useState([]);
    const { t } = useTranslation();

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

    const markerCount = distance.filter(dist => dist <= 10000000000).length;

    const getMarkerCountText = (markerCount) => {
        if (markerCount === 1) {
            return `${markerCount} ${t('oneMarker')}`;
        } else if (markerCount >= 2 && markerCount <= 4) {
            return `${markerCount} ${t('twoMarkers')}`;
        } else {
            return `${markerCount} ${t('threeMarker3')}`;
        }
    };

    return (
        <div className='overflow-auto'>
            <div className='mx-auto w-[80%]'>
                <h1 className='text-lg'>
                    <span className='text-light-blue font-medium'>
                        {getMarkerCountText(markerCount)}
                    </span>
                </h1>
                <ul className="flex flex-col gap-2 items-start mt-3">
                    {currentMarkers.map((marker, index) => {
                        if (distance[index] <= 10000000000) {
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
                                                } alt="danger_circle" />
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
                            <p>{t('NoMarkers')}</p>;
                        }
                    })}
                </ul>
            </div>

        </div>
    );
};

export default NearMarkers;
