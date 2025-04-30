import { configureStore } from "@reduxjs/toolkit";
import transportationReducer from "./transportationStore";
import cityReducer from "./cityStore";

export const store = configureStore({
    reducer: {
        transportation: transportationReducer,
        cities: cityReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;