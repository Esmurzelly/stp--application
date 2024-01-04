import React, { useState } from 'react'
import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/solid';

const FaqQuestion = ({ question, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    const handleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    }
    return (
        <div className='w-full mt-2'>
            <div onClick={() => handleShowAnswer()} className={`w-full flex flex-row justify-between items-start py-3 px-4 ${showAnswer ? "rounded-t-lg" : ""} bg-gradient-to-r from-[#B1E3FF] to-[#DFBEFF]`}>
                <h3 className='text-base text-landing-faq-question basis-4/5'>{question}</h3>

                {showAnswer ? (
                    <BarsArrowUpIcon className='w-4' />
                ) : (
                    <BarsArrowDownIcon className='w-4' />
                )}
            </div>

            {showAnswer && <p className='text-landing-faq-answer text-sm py-4 px-8'>{answer}</p>}
        </div>
    )
}

export default FaqQuestion