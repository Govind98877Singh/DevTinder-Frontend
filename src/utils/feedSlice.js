import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: [], // start as an empty array
    reducers: {
        addFeedUser: (state,action) =>
        {
            return action.payload; // replace with fetched array
        },
        removeFeedUser: (state,action) =>
        {
            const newArr = state.filter((data) => data._id != action.payload);
            return newArr;
        }

    }
});

export const { addFeedUser,removeFeedUser } = feedSlice.actions;

export default feedSlice.reducer;
