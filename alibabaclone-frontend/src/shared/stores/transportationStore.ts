// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import agent from "../api/agent";
// import { TransportationSearchRequest } from "../models/transportation/transportationSearchRequest";
// import { TransportationSearchResult } from "../models/transportation/transportationSearchResult";

// interface TransportationState {
//     transportations: TransportationSearchResult[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: TransportationState = {
//     transportations: [],
//     loading: false,
//     error: null
// };

// export const searchTransportations = createAsyncThunk(
//     'transportation/search',
//     async (request: TransportationSearchRequest, { rejectWithValue }) => {
//         try {
//             const response = await agent.transportations.search(request);
//             return response;
//         } catch (error: any) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const transportationSlice = createSlice({
//     name: 'transportation',
//     initialState,
//     reducers: {
//         clearTransportations: (state) => {
//             state.transportations = [];
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(searchTransportations.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(searchTransportations.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.transportations = action.payload;
//             })
//             .addCase(searchTransportations.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     }
// });

// export const { clearTransportations } = transportationSlice.actions;
// export default transportationSlice.reducer;