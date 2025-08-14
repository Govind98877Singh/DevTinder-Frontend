import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
    name: "request",
    initialState: [],
    reducers: {
        addRequests: (state,action) =>
        {
            return action.payload;
        },
        removeRequest: (state,action) =>
        {
            const newArr = state.filter((eachRequest) => eachRequest._id != action.payload);
            return newArr
        }
    }

})

export const { addRequests,removeRequest } = RequestSlice.actions;

export default RequestSlice.reducer;