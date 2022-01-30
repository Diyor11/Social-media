import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPosts } from '../../apis/api'

export const fetchAllPosts = createAsyncThunk('postSlice/fetchAllPosts', async(id) => {
    const data = await getAllPosts(id)
    console.log(data)
    return data
})

const postSlice = createSlice({
    name: 'posts',
    initialState: {posts: []},
    reducers: {
        addPost: ({posts}, {payload}) => {
            posts = payload 
        }, 
        hidePost: ({posts}, {payload}) => {
            posts = posts.filter(post => post._id !== payload)
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
