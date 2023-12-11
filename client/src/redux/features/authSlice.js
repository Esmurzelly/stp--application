import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    user: null,
    token: null,
    isLoading: null,
    status: null,
    isAdmin: false,
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, fullName, city, avatar }) => {
        try {
            const { data } = await axios.post('/auth/register', {
                email,
                password,
                fullName,
                city,
                avatar
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }

            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }) => {
        try {
            const { data } = await axios.post('auth/login', {
                email,
                password,
            });

            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const getMe = createAsyncThunk(
    'auth/loginUser',
    async () => {
        try {
            const { data } = await axios.get('/auth/me');
            
            return data;
        } catch (error) {
            console.log(`error is ${error}`);
        }
    }
)

export const editUserProfile = (updatedProfile) => async (dispatch) => {
    try {
        const response = await axios.put('auth/', updatedProfile);

        dispatch({ type: 'EDIT_PROFILE_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error:', error);
        dispatch({ type: 'EDIT_PROFILE_ERROR', payload: error.message });
    }
};

export const uploadAvatar = createAsyncThunk(
    'auth/uploadAvatar',
    async (formData) => {
        try {
            const response = await axios.post('/auth/avatar', formData, {
                'Content-Type': 'multipart/form-data',
            });
            
            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }
);

export const deleteAvatar = createAsyncThunk(
    'auth/deleteAvatar',
    async () => {
        try {
            const response = await axios.delete('/auth/avatar');
            
            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }
);


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: state => {
            state.user = null;
            state.token = null;
            state.isLoading = null;
            state.status = null;
        },
    },
    extraReducers: {
        [registerUser.pending]: state => {
            state.isLoading = true;
            state.status = null;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;

            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        [registerUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
        },


        [loginUser.pending]: state => {
            state.isLoading = true;
            state.status = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
        },

        [getMe.pending]: state => {
            state.isLoading = true;
            state.status = null;
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = null;
            state.user = action.payload?.user;
            state.token = action.payload?.token;

            let adminEmail = action.payload?.user?.email;
            state.isAdmin = true ? adminEmail === 'adam@test.com' : false;
        },
        [getMe.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload ? action.payload.message : "Error occurred";
        },

        [editUserProfile.pending]: state => {
            state.isLoading = true;
            state.status = null;
        },
        [editUserProfile.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = null;
            state.user = action.payload?.user;
            state.token = action.payload?.token;
        },
        [editUserProfile.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload ? action.payload.message : "Error occurred";
        }
    }
});

export const checkIsAuth = state => Boolean(state.auth.token);

export const { logOut } = authSlice.actions;
export default authSlice.reducer;