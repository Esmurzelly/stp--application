import React, { useState, useEffect, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { calculateDistance } from '../utils/calculateDistance';


import NearMarkerItem from './NearMarkerItem';

const NearMarkers = ({ userLocation, onMarkerClick }) => {
    const { currentMarkers } = useSelector(state => state.markers);
    const [distance, setDistance] = useState([]);
    const { t } = useTranslation();

    const updateNearMarkers = useCallback(() => {
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
    }, [userLocation, currentMarkers])

    useEffect(() => {
        updateNearMarkers();
    }, [updateNearMarkers]);

    const markerCount = distance.filter(dist => dist <= 10000).length;

    return (
        <div className='overflow-auto'>
            <div className='mx-auto w-[80%]'>

                {markerCount > 0 ? (
                    <>
                        <h1 className='text-lg'>
                            <span className='text-light-blue font-medium'>
                                {t('MarksNumber')} {markerCount}
                            </span>
                        </h1>
                        <ul className="flex flex-col gap-2 items-start mt-3">
                            {currentMarkers.map((marker, index) => {
                                if (distance[index] <= 10000) {
                                    return (
                                        <NearMarkerItem
                                            key={marker._id}
                                            _id={marker._id}
                                            category={marker.category}
                                            description={marker.description}
                                            position={marker.position}
                                            onMarkerClick={onMarkerClick}
                                            distance={distance[index]}
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </ul>
                    </>

                ) : (
                    <p className='text-lg text-light-blue font-medium'>{t('NoMarkers')}</p>
                )}

            </div>

        </div>
    );
};

export default NearMarkers;
