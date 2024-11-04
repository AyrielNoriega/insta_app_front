import { createSlice } from '@reduxjs/toolkit';

interface Publications {
    id : number;
    title: string;
    content: string;
    author: string;
    date: string;
}

const initialState = {
    publications: [] as Publications[],
};

export const publicationSlice = createSlice({
    name: 'publication',
    initialState,
    reducers: {
        setPublications: (state, action) => {
            state.publications = action.payload;
        }

    }
});

// Action creators are generated for each case reducer function
export const {
    setPublications
} = publicationSlice.actions;
