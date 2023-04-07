import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    notifications: [],
    status: null,
};

export const notificationFetch = createAsyncThunk(
    "notification/notificationFetchFetch",
    async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/notification"
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
    },
    extraReducers: {
        [notificationFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [notificationFetch.fulfilled]: (state, action) => {
            state.notifications = action.payload;
            state.status = "success";
        },
        [notificationFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});
export const { getNotifications } = notificationSlice.actions;


export default notificationSlice.reducer;