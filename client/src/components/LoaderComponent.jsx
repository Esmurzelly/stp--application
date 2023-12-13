import React from 'react';

import { useTranslation } from 'react-i18next';

import Loader from '@trendmicro/react-loader';
import '@trendmicro/react-loader/dist/react-loader.css';

const LoaderComponent = () => {
    const { t } = useTranslation();

    return (
        <div className='w-full min-h-screen'>
            <div className='flex flex-col min-h-[42vh] justify-around items-center'>
                <h1 className='text-center'>{t('TurnOffDeny')}</h1>
                <Loader
                    size="lg"
                    className="component text-black"
                >
                    GitHub
                </Loader>
            </div>

        </div>

    )
}

export default LoaderComponent;