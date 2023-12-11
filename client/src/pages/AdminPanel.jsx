import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllMarkers, removeMarker } from '../redux/features/markerSlice';
import logo from '../assets/main/Logo.svg';
import { useNavigate, Link } from 'react-router-dom';
import LoaderComponent from '../components/LoaderComponent';
import AdminCart from '../components/AdminCart';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [markers, setMarkers] = useState(null);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const response = await dispatch(getAllMarkers());
                setMarkers(response.payload.markers);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMarkers();
    }, [dispatch]);

    const deleteMarker = (id) => {
        dispatch(removeMarker(id));
        setMarkers(markers.filter(marker => marker._id !== id));
    }

    return (
        <section className='flex flex-col min-h-screen bg-white py-3 px-5 font-roboto font-extralight'>
            <div className='w-full flex justify-between items-center'>
                <Link to={`/`} className="logo">
                    <img className='w-16 h-16' src={logo} alt="logo" />
                </Link>

                <button onClick={() => navigate(-1)}>Back</button>
            </div>

            {markers === null ? (
                <LoaderComponent />
            ) : (
                <ul className='flex flex-col gap-10'>
                    {markers?.map(el => (
                        <AdminCart
                            key={el._id}
                            category={el.category}
                            createdAt={el.createdAt}
                            description={el.description}
                            metres={el.metres}
                            _id={el._id}
                            author={el.author}
                            image={el?.image}
                            position_1={el.position[0]}
                            position_2={el.position[1]}
                            OnDelete={() => deleteMarker(el._id)}
                        />
                    ))}
                </ul>
            )}
        </section>
    )
}

export default AdminPanel