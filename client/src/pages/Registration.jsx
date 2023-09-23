import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkIsAuth, registerUser } from '../redux/features/authSlice';
import { toast } from 'react-toastify';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(checkIsAuth);
    const { status } = useSelector(state => state.auth);

    useEffect(() => {
        if (status) toast(status);
        if (isAuth) navigate('/');
    }, [status, isAuth, navigate]);

    const handleSubmit = () => {
        try {
            dispatch(registerUser({ email, password, fullName, city }));
            setEmail('');
            setPassword('');
            setFullName('');
            setCity('');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <form
            onSubmit={e => e.preventDefault()}
        >
            <h1>Registration</h1>

            <div>
                <label>
                    Full name:
                    <input
                        type="text"
                        placeholder='Name'
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                    />
                </label>

                <label>
                    Emai:
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>

                <label>
                    City:
                    <input
                        type="text"
                        placeholder='City'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <button
                    onClick={handleSubmit}
                    type='submit'
                >
                    Submit
                </button>

                <Link
                    to="/login"
                >
                    Уже зарегистрирован?
                </Link>
            </div>
        </form>
    )
}

export default Registration