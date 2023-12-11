import React from 'react'

const AdminCart = ({ category, createdAt, description, metres, _id, author, image, position_1, position_2, OnDelete }) => {
    return (
        <li className='shadow-lg p-5 flex flex-col gap-3 rounded-md' key={_id}>
            <p>Category - {category}</p>
            <p>Date - {createdAt}</p>
            <p>description - {description}</p>
            <p>metres - {metres}</p>
            <p>position - {position_1}, {position_2}</p>
            <p>id marker - {_id}</p>
            <p>id author - {author}</p>

            {image && (
                <div className='max-w-md'>
                    <p>image - {image}</p>
                    <img className='w-full' src={`${process.env.REACT_APP_REQUEST_IMAGE}/${image}`} alt="cart_image" />
                </div>
            )}

            <button className='bg-red-500 rounded-sm py-1 px-3' onClick={() => OnDelete(_id)}>Delete</button>
        </li>
    )
}

export default AdminCart