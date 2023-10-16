import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  markers: [],
  currentMarkers: [],
  loading: false,
};

export const createMarker = createAsyncThunk(
  'markers/createMarker',
  async params => {
    try {
      const { data } = await axios.post('/markers', params);
        console.log('data from redux', data);
      return data;
    } catch (error) {
      console.error('Ошибка при создании маркера:', error);
    }
  }
);

export const getAllMarkers = createAsyncThunk(
  'markers/getAllMarkers',
  async () => {
    try {
      const { data } = await axios.get('/markers');
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeMarker = createAsyncThunk(
  'markers/removeMarker',
  async id => {
    try {
      const { data } = await axios.delete(`/markers/${id}`, id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const markerSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {},
  extraReducers: {
    [createMarker.pending]: state => {
      state.loading = true;
    },
    [createMarker.fulfilled]: (state, action) => {
      state.loading = false;
      state.markers.push(action.payload);
    },
    [createMarker.rejected]: state => {
      state.loading = false;
    },

    [getAllMarkers.pending]: state => {
      state.loading = true;
    },
    [getAllMarkers.fulfilled]: (state, action) => {
      state.loading = false;
      state.markers = action.payload.markers;
      state.currentMarkers = action.payload.currentMarkers;
    },
    [getAllMarkers.rejected]: state => {
      state.loading = false;
    },

    [removeMarker.pending]: state => {
      state.loading = true;
    },
    [removeMarker.fulfilled]: (state, action) => {
      state.loading = false;
      state.markers = state.markers.filter(
        marker => marker._id !== action.payload._id
      );
    },
  },
});

export default markerSlice.reducer;
