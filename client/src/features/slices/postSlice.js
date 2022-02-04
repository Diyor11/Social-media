import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPosts, getPostsById } from '../../apis/api'

export const fetchAllPosts = createAsyncThunk('postSlice/fetchAllPosts', async(id) => {
    const data = await getAllPosts(id)
    return data
})

export const fetchMyPosts = createAsyncThunk('postSlice/fetchMyPosts', async(id) => {
    const data = await getPostsById(id)
    return data
})

const postSlice = createSlice({
    name: 'ass',
    initialState: {posts: [], myposts: []},
    reducers: {
        addPost: (state, {payload}) => {
            state.posts.unshift(payload)
            state.myposts.unshift(payload)
            return state
        }, 
        hidePost: (state, {payload}) => {
            state.posts = state.posts.filter(post => post._id !== payload)
            return state
        },
        deletePost: (state, {payload}) => {
            state.posts = state.posts.filter(post => post._id !== payload)
            state.myposts = state.myposts.filter(post => post._id !== payload)
        }
    },
    extraReducers: {
        [fetchAllPosts.fulfilled]: (state, {payload}) => {
            return {...state, posts: payload}
        },
        [fetchAllPosts.rejected]: () => {
            console.log('Error fetching all recomended posts')
        },
        [fetchMyPosts.fulfilled]: (state, {payload}) => {
            return {...state, myposts: payload}
        },
        [fetchMyPosts.rejected]: () => {
            console.log('Error fetching my posts')
        }
    }
})

export const { addPost, hidePost, deletePost } = postSlice.actions
export default postSlice.reducer
