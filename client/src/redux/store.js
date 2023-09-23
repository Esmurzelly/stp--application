import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import markerSlice from './features/markerSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        markers: markerSlice,
    }
})