import { createSlice } from "@reduxjs/toolkit";

const CATEGORIES_INITIAL_STATE = {
    categories: [],
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        // setCategories: () => {}   or
        setCategories(state, action) {
            state.categories = action.payload
        },
    },
});

export const { setCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;