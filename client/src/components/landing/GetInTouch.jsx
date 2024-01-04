import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../../utils/axios';

const GetInTouch = () => {
    const formInitialDetails = {
        fullName: '',
        email: '',
        message: '',
    };
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const { register, formState: { errors }, handleSubmit, } = useForm();

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value,
        });
    };

    const handleTypeSubmit = async () => {
        const response = await axios.post('/auth/contact', formDetails, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        if (response.status === 200) {
            alert("Message Sent Successfully!");
            setFormDetails(formInitialDetails);
        } else {
            alert(`Error while sending message - ${response.statusText}`);
        }
    }

    return (
        <div id='getintouch' className='w-full h-full mt-14 px-4'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-center font-semibold text-landing-headline text-4xl'>Связаться с нами</h1>

                <div className='w-full overflow-hidden mt-6'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d22942.183525236298!2d43.04076800000001!3d44.0467456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1704267698770!5m2!1sru!2sru" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div className='flex flex-col items-center justify-center w-full mt-6'>
                    <h3 className='text-landing-gray text-xl'>
                        Мы ценим ваше мнение!
                        Оставьте нам сообщение и мы свяжемся с вами в ближайшее время.
                    </h3>

                    <form onSubmit={handleSubmit(handleTypeSubmit)} className='flex flex-col items-end w-full h-full mt-6'>
                        <div className='flex flex-col gap-3 w-full'>
                            <input
                                type="text"
                                value={formDetails.fullName}
                                {...register('fullName',
                                    {
                                        required: "This input is required",
                                        maxLength: 99,
                                    }
                                )}
                                placeholder={'Имя'}
                                onChange={e => onFormUpdate('fullName', e.target.value)}
                                className='w-full outline-none rounded-md placeholder:text-landing-form-placeholder text-black bg-landing-form-field p-5'
                            />
                            {errors.fullName?.type === 'required' && (
                                <p className='text-chilli_red' role='alert'>Это поле обязательно для заполнения</p>
                            )}

                            <input
                                type="email"
                                value={formDetails.email}
                                {...register('email', {
                                    required: "This input is required",
                                    minLength: 7,
                                })}
                                placeholder={'Email'}
                                onChange={e => onFormUpdate('email', e.target.value)}
                                className='w-full outline-none rounded-md placeholder:text-landing-form-placeholder text-black bg-landing-form-field p-5'
                            />
                            {errors.email?.type === 'required' && (
                                <p className='text-chilli_red' role='alert'>Это поле обязательно для заполнения</p>
                            )}

                            <textarea
                                rows={3}
                                value={formDetails.message}
                                {...register('message', {
                                    required: "Please enter a message.",
                                    minLength: 3,
                                })}
                                placeholder={'Сообщение'}
                                onChange={e => onFormUpdate('message', e.target.value)}
                                className='w-full resize-none outline-none rounded-md placeholder:text-landing-form-placeholder text-black bg-landing-form-field p-5 lg:h-[200px]'
                            ></textarea>
                            {errors.message?.type === 'required' && (
                                <p className='text-chilli_red' role='alert'>Это поле обязательно для заполнения</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className='mt-2 text-lg bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 border-none px-3 py-2 rounded-lg text-white'
                        >
                            <span>Отправить</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch