import React from 'react';
import { useTranslation } from 'react-i18next';

import comment from '../assets/main/comment.svg';
import redEllipse from '../assets/ellipses/red_ellipse.svg';
import blueEllipse from '../assets/ellipses/blue_ellipse.svg';
import greenEllipse from '../assets/ellipses/green_ellipse.svg';
import purpleEllipse from '../assets/ellipses/purple_ellipse.svg';
import yellowEllipse from '../assets/ellipses/yellow_ellipse.svg';

const NearMarkerItem = ({ _id, position, category, description, onMarkerClick, distance }) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    let translatedCategory = '';

    switch (category) {
        case 'Угроза жизни':
            translatedCategory = t('DangerLife', { lng: currentLanguage });
            break;
        case 'Неадекватное поведение':
            translatedCategory = t('CrazyBehavior', { lng: currentLanguage });
            break;
        case 'Домагательства':
            translatedCategory = t('Harassment', { lng: currentLanguage });
            break;
        case 'Проблемы с инфраструктурой':
            translatedCategory = t('Infrastructure', { lng: currentLanguage });
            break;
        case 'Авария':
            translatedCategory = t('CarIncident', { lng: currentLanguage });
            break;
        default:
            translatedCategory = category;
            break;
    }

    return (
        <li
            className="px-[9px] py-[7px] w-full bg-[#F6F6F6] rounded-lg cursor-pointer"
            key={_id}
            onClick={() => {
                onMarkerClick(position);
            }}
        >
            <div className="grid grid-cols-4 grid-rows-2 gap-0">
                <div className="grid-item col-span-3">
                    <h1 className='text-left'>{translatedCategory} </h1>
                </div>
                <div className="grid-item col-start-4 col-end-5 justify-center">
                    <div className='flex gap-1 justify-end items-start'>
                        <p className='text-xs text-right'>{distance} м</p>
                        <img src={
                            category === "Угроза жизни" ? redEllipse :
                                category === "Неадекватное поведение" ? yellowEllipse :
                                    category === "Домагательства" ? purpleEllipse :
                                        category === "Проблемы с инфраструктурой" ? blueEllipse :
                                            category === "Авария" ? greenEllipse :
                                                redEllipse
                        } alt="danger_circle" />
                    </div>
                </div>
                <div className="grid-item row-start-2 row-end-3 col-span-4">
                    <p className='flex gap-2 text-xs text-left break-words'>
                        <img className='w-3' src={comment} alt="comment" />
                        {description}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default NearMarkerItem