import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../interfaces';

interface Publications {
    id : number;
    title: string;
    content: string;
    author: string;
    date: string;
}

const initialState = {
    publications: [] as Publications[],
    user: {
        id: '',
        name: '',
        username: '',
        email: '',
    } as User,
};

export const publicationSlice = createSlice({
    name: 'publication',
    initialState,
    reducers: {
        setPublications: (state, action) => {
            state.publications = action.payload;
        },
        setUser: (state, action) => {
            console.log("en setUser", action.payload);
            state.user = action.payload;
        },

    }
});

// Action creators are generated for each case reducer function
export const {
    setPublications,
    setUser,
} = publicationSlice.actions;
