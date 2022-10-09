import { createAsyncThunk, createSlice,createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL"; 

//redirect
const resetPost = createAction("post/reset");
const resetPostEdit = createAction("post/update");
const resetPostDelete = createAction("post/delete");


//Create post action

export const createPostAction = createAsyncThunk('post/created',async(
    post,{rejectWithValue,getState,dispatch})=>{
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config ={
        headers: {
            Authorization:`Bearer ${userAuth?.token}`,
        }
    };
    try {
        // http call
        const formData = new FormData();
        formData.append('title',post?.title);
        formData.append('description',post?.description);
        formData.append('category',post?.category);
        formData.append('image',post?.image);

        const { data } = await axios.post(`${baseUrl}/api/posts`,formData,config)
        //dispatch data
            dispatch(resetPost())
        return data;
    } catch (error) {
       if(!error?.response)throw error;
       return rejectWithValue(error?.response?.data); 
    }
    }) 




    const postSlice=createSlice({
        name:'post',
        initialState: {
        extraReducers:(builder)=>{
            builder.addCase(createPostAction.pending, (state, action) => {
                state.loading = true;
            });
            builder.addCase(createPostAction.fulfilled, (state, action) => {
              
                state.postCreated = action.payload;
                state.loading = false;
                state.appErr=undefined;
                state.serverErr=undefined;
            });
            builder.addCase(createPostAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr=action.payload?.message;
                state.serverErr=action.error?.message;
            });
        }
}
})
export default postSlice.reducer;
