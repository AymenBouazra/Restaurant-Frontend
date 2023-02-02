import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
};

export const foodFetch = createAsyncThunk(
    "food/foodFetch",
    async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/clientSideFood"
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {},
    extraReducers: {
        [foodFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [foodFetch.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [foodFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default foodSlice.reducer;