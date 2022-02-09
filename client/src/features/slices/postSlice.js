import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPosts, getPostsById } from '../../apis/api'

export const fetchAllPosts = createAsyncThunk('postSlice/fetchAllPosts', getAllPosts)

export const fetchMyPosts = createAsyncThunk('postSlice/fetchMyPosts', getPostsById)

const postSlice = createSlice({
    name: 'ass',
    initialState: {posts: [], myposts: [], filteredPosts: []},
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
        },
        filterPost: (state, {payload}) => {
            state.filteredPosts = payload
            return state
        },
        likePost: (state, {payload: {userId, postId}}) => {
            const postIndex = state.posts.findIndex(post => post._id === postId)
            if(state.posts.find(obb => obb._id === postId).likes.includes(userId)){
                state.posts[postIndex].likes = state.posts[postIndex].likes.filter(id => id !== userId)
            } else {
                state.posts[postIndex].likes.push(userId)
            }
            return state
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

export const { addPost, hidePost, deletePost, filterPost, likePost } = postSlice.actions
export default postSlice.reducer
