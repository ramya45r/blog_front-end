import {configureStore} from "@reduxjs/toolkit";
import usersReducer from '../slices/users/usersSlices'
import categoriesReducer from '../slices/category/categorySlice'
import postReducer from "../slices/Posts/PostSlices"
const store=configureStore({
    reducer:{
        users:usersReducer,
        auth:{},
        category:categoriesReducer,
        posts:postReducer
    },
});
export default store;