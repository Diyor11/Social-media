import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPosts } from '../../apis/api'

export const fetchAllPosts = createAsyncThunk('postSlice/fetchAllPosts', async(id) => {
    const data = await getAllPosts(id)
    return data
})

const postSlice = createSlice({
    name: 'ass',
    initialState: {posts: []},
    reducers: {
        addPost: (state, {payload}) => {
            state.posts.unshift(payload)
            return state
        }, 
        hidePost: (state, {payload}) => {
            state.posts = state.posts.filter(post => post._id !== payload)
            return state
        }
    },
    extraReducers: {
        [fetchAllPosts.fulfilled]: (state, {payload}) => {
            return {...state, posts: payload}
        },
        [fetchAllPosts.rejected]: () => {
            console.log('Error fetching all recomended posts')
        }
    }
})

export const { addPost, hidePost } = postSlice.actions
export default postSlice.reducer
