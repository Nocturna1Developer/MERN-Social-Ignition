import { createSlice } from "@reduxjs/toolkit";



/*
* Simple Functions that modify the global state
* 
* This data will be accessible throughout the application and we can 
* grab it anywhere we want.
*
* ALL the logic needed for redux in our website
*/

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

// set the "payload" ie parameters
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User friends non-existent :(")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        // only change updated post from the backend
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.post._id)
                    return action.payload.post;
                else
                    return post;
            });

            state.posts = updatedPosts;
        }
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;