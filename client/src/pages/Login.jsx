import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkIsAuth, loginUser } from '../redux/features/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isAuth = useSelector(checkIsAuth);

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            if (status) toast(status);
            if (isAuth) navigate('/');
        } catch (error) {
            console.log(`error in useEffect - ${error}`)
        }
    }, [status, isAuth, navigate]);

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ email, password }));
        } catch (error) {
            console.log(`error in handleSubmit - ${error}`)
        }
    };


    return (
        <form onSubmit={e => e.preventDefault()}>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='email'
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='password'
                    />
                </label>
            </div>

            <div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                >
                    Войти
                </button>
                <Link
                    to="/register"
                >
                    Нет аккаунта?
                </Link>
            </div>
        </form>
    );
};

export default Login;
