import {configureStore} from "@reduxjs/toolkit";
import usersReducer from '../slices/users/usersSlices'
import categoriesReducer from '../slices/category/categorySlice'
import postReducer from "../slices/Posts/PostSlices"
import commentReducer from '../slices/comments/commentSlices'

const store=configureStore({
    reducer:{
        users:usersReducer,
        auth:{},
        category:categoriesReducer,
        post:postReducer,
        comment: commentReducer,
        
    },
});
export default store;