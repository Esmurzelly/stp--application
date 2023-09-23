import React, { useState } from 'react';
import { createMarker } from '../redux/features/markerSlice';
import { useDispatch } from 'react-redux';

const ModalWindow = ({ handleChangeModal }) => {
    const [markerName, setMarkerName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const testPosition = [44.3518889, 43.3644363];

    const dispatch = useDispatch();

    const submitHandler = () => {
        try {
            const data = new FormData();
            data.append('markerName', markerName);
            data.append('category', category);
            data.append('description', description);
            data.append('position', testPosition);

            dispatch(createMarker(data));
        } catch (error) {
            console.log(`send error - ${error}`);
        }
    };

    const clearFormHandler = () => {
        setMarkerName('');
        setCategory('');
        setDescription('');
    };

    return (
        <form
            className="w-screen h-screen absolute bg-black text-white"
            onSubmit={e => e.preventDefault()}
        >
            <label htmlFor="name">
                <span>Название:</span>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder='Название'
                    value={markerName}
                    onChange={e => setMarkerName(e.target.value)}
                />
            </label>
            <label htmlFor="category">
                <span>Категория:</span>
                <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder='Название'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
            </label>
            <label htmlFor="description">
                <span>Описание:</span>
                <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder='Название'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </label>

            <div>
                <button className='ml-8' onClick={handleChangeModal}>Exit</button>
                <button className='ml-8' onClick={submitHandler}>Add</button>
                <button className='ml-8' onClick={clearFormHandler}>Clear</button>
            </div>


        </form>
    );
};

export default ModalWindow;
