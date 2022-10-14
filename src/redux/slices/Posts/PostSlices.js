import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";
import axiosInstance from "../../../utils/api_instance";
//redirect
const resetPost = createAction("post/reset");

//Create post action

// export const createPostAction = createAsyncThunk(
//   "post/created",
//   async (post, { rejectWithValue, getState, dispatch }) => {
//     console.log(post);
//     //get user token
//     const user = getState()?.users;
//     const { userAuth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userAuth?.token}`,
//       },
//     };
//     try {
//       // http call
//       const formData = new FormData();
//       formData.append("title", post?.title);
//       formData.append("description", post?.description);
//       formData.append("category", post?.category);
//       formData.append("image", post?.image);
//       console.log(formData, post);
//       const { data } = await axios.post(
//         `${baseUrl}/api/posts`,
//         formData,
//         config
//       );
//       //dispatch data
//       dispatch(resetPost());
//       return data;
//     } catch (error) {
//       if (!error?.response) throw error;
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );






export const createpostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    console.log(post);
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
      formData.append("image", post?.image);

      const { data } = await axios.post(
        `${baseUrl}/api/posts`,
        formData,
        config
      );
      //dispatch action
      dispatch(resetPost());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
// // fetch all category action
// export const fetchAllPostAction= createAsyncThunk('post/fetchAllPost',async(
//   category,{rejectWithValue,getState,dispatch})=>{

//   try {
//       const { data } = await axiosInstance.get(`/api/posts?category=${category}`) 
//       return data;
//   } catch (error) {
//      if(!error?.response)throw error;
//      return rejectWithValue(error?.response?.data); 
//   }
//   }) 

  //fetch all posts
export const fetchAllPostAction = createAsyncThunk('post/fetchAllPost',async(
  category,{rejectWithValue,getState,dispatch})=>{

  try {
      const { data } = await axios.get( `${baseUrl}/api/posts?category=${category}`) 
      // console.log(data,'data');
      return data;
  } catch (error) {
     if(!error?.response)throw error;
     return rejectWithValue(error?.response?.data); 
  }
  }) 



//slice

const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: builder => {
    //create post
    builder.addCase(createpostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPost, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createpostAction.fulfilled, (state, action) => {
      state.postCreated = action?.payload;
      state.loading = false;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createpostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });


     //---------fetch all posts

 builder.addCase(fetchAllPostAction.pending, (state,action)=>{
  state.loading = true;
})

builder.addCase(fetchAllPostAction.fulfilled, (state,action)=>{
  
  state.postLists =action?.payload;
  state.loading = false;
  state.appErr = undefined;
  state.serverErr = undefined;
})
builder.addCase(fetchAllPostAction.rejected, (state,action)=>{
  state.loading = false;
  state.appErr= action?.payload?.message;
  state.serverErr=action?.error?.message;
})
   
  },
});

// const postSlice = createSlice({
//   name: "post",
//   initialState: {
//     extraReducers: (builder) => {
//     //CreatePostAction
//       builder.addCase(createPostAction.pending, (state, action) => {
//         console.log(action.payload);
//         state.loading = true;
//       });
//       builder.addCase(resetPost, (state, action) => {

//         state.isCreated = true;
//       });
//       builder.addCase(createPostAction.fulfilled, (state, action) => {
//         state.postCreated = action?.payload;
//         state.loading = false;
//         state.appErr = undefined;
//         state.serverErr = undefined;
//         state.isCreated = false;
//       });
//       builder.addCase(createPostAction.rejected, (state, action) => {
//         state.loading = false;
//         state.appErr = action?.payload?.message;
//         state.serverErr = action?.error?.message;
//       });


// },
// },
// });
export default postSlice.reducer;
