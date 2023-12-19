import React from 'react'

const ImageModal = ({ image, onClick, showImageModal }) => {
    return (
        <div onClick={onClick} className='w-full h-full cursor-pointer'>
            {showImageModal ? (
                <img className='w-full' src={image} alt="marker__image" />
            ) : (
                <img className='w-24' src={image} alt="marker__image" />
            )}
        </div>
    )
}

export default ImageModal