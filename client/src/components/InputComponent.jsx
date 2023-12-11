import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const InputComponent = ({
    type,
    value,
    onChange,
    placeholder,
    name,
    register,
    error,
    required,
    minLength,
    maxLength,
    autoComplete,
    validatePasswordMatch,
    pattern }) => {
    const { t } = useTranslation();

    const registerOptions = {
        required,
        minLength,
        maxLength,
        pattern,
    };

    if (validatePasswordMatch) {
        registerOptions.validate = (value) =>
            value === document.getElementsByName('password')[0].value; // Сравниваем с полем password
    }

    const renderError = () => {
        if (error === "required") {
            return <p className='validate__error'><ExclamationTriangleIcon width={12} /> {t("RequiredError")} </p>;
        } else if (error === "maxLength") {
            return <p className='validate__error'><ExclamationTriangleIcon width={12} /> {t("LoginError")} </p>;
        } else if (error === "minLength") {
            return <p className='validate__error'><ExclamationTriangleIcon width={12} /> few signs of name </p>;
        } else if (error === "pattern") {
            return <p className='validate__error'><ExclamationTriangleIcon width={12} /> {t('AlphabetError')} </p>;
        } else if (error === "validate") {
            return <p className='validate__error'><ExclamationTriangleIcon width={12} /> Not matched </p>;
        } else {
            return null;
        }
    };

    return (
        <div className='border border-b-[2px] border-t-0 border-l-0 border-r-0 border-b-gray-200'>
            <input
                className='placeholder:text-light-gray placeholder:text-xl placeholder:text-center placeholder:opacity-40 focus:outline-none'
                {...register(name, registerOptions)}
                autoComplete={autoComplete}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {renderError()}
        </div>
    )
}

export default InputComponent