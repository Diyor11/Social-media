import { configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import posts from './slices/postSlice'

export default configureStore({
    reducer: {
        user,
        posts
    }
})