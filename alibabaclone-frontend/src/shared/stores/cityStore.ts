import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { City } from "../models/city/city";

interface CityState {
    cities: City[];
    loading: boolean;
    error: string | null;
}

const initialState: CityState = {
    cities: [],
    loading: false,
    error: null
};

export const loadCities = createAsyncThunk(
    'cities/load',
    async (_, { rejectWithValue }) => {
        try {
            return await agent.cities.list();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadCities.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(loadCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default citySlice.reducer;