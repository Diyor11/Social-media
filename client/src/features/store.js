import { configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import posts from './slices/postSlice'
import users from './slices/usersSlice'

export default configureStore({
    reducer: {
        user,
        posts, 
        users
    }
})