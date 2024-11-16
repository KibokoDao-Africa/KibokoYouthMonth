import { configureStore } from "@reduxjs/toolkit";
import poolReducer from "./poolSlice";

export const store = configureStore({
    reducer: {
        pool: poolReducer,
    },
});
