import React from 'react';
import { useTranslation } from 'react-i18next';

const ChangeLanguage = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return (
        <div className='flex items-center gap-2'>
            <span onClick={() => changeLanguage("ru")} className="cursor-pointer w-5 fi fi-ru"></span>
            <span onClick={() => changeLanguage("en")} className="cursor-pointer w-5 fi fi-gb"></span>
            <span onClick={() => changeLanguage("de")} className="cursor-pointer w-5 fi fi-de"></span>
            <span onClick={() => changeLanguage("ko")} className="cursor-pointer w-5 fi fi-kr"></span>
            <span onClick={() => changeLanguage("zh")} className="cursor-pointer w-5 fi fi-cn"></span>
        </div>
    )
}

export default ChangeLanguage