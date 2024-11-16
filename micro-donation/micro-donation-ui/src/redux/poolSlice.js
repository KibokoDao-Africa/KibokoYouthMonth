import { createSlice } from "@reduxjs/toolkit";

const poolSlice = createSlice({
    name: "pool",
    initialState: {
        pools: [],
    },
    reducers: {
        createPool: (state, action) => {
            state.pools.push({ id: Date.now(), ...action.payload, raisedAmount: 0 });
        },
    },
});

export const { createPool } = poolSlice.actions;
export default poolSlice.reducer;
