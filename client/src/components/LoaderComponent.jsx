import React from 'react';

import Loader from '@trendmicro/react-loader';
import '@trendmicro/react-loader/dist/react-loader.css';

const LoaderComponent = () => {
    return (
        <div className='w-full min-h-screen'>
            <div className='flex flex-col min-h-[42vh] justify-around items-center'>
                {/* language */}
                <h1 className='text-center'>Перед использованием сервиса, пожалуйста, отключите запрет на отправку геолокиции!</h1>
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