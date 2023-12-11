import { CheckIcon } from '@heroicons/react/24/solid';
import React from 'react'

const DangerItem = ({ categoryItem, categoryText, isSelected, setCategory, iconSrc }) => {
    return (
        <div className='flex gap-1 items-center cursor-pointer' onClick={() => setCategory(categoryItem)}>
            <img className='w-3 phone_md:w-4' src={iconSrc} alt={categoryItem} />
            <span className='text-xs phone_md:text-base'>{categoryText}</span>
            {isSelected && <CheckIcon className='w-3 h-3' />}
        </div>
    )
}

export default DangerItem