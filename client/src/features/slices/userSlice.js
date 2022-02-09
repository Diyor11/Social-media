import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAvatar, suggistion, getFollow, getUnFollow } from '../../apis/api'

export const fetchAvatar = createAsyncThunk('userSlice/fetchAvatar', getAvatar)
export const fetchAllUsers = createAsyncThunk('userSlice/fetchAllUsers', suggistion)
export const fetchFollow = createAsyncThunk('userSlice/fetchFollow', getFollow)
export const fetchUnFollow = createAsyncThunk('userSlice/fetchUnFollow', getUnFollow)

const userSlice = createSlice({
    name: 'user',
    initialState: {user: JSON.parse(localStorage.getItem('profile-data'))?.user || null},
    reducers: {
        logIn: (state, {payload}) => {
            localStorage.setItem('profile-data', JSON.stringify(payload))
            window.location.pathname = '/'
        },
        logOut: (state) => {
            state.user = null
            localStorage.removeItem('profile-data')
        },
        updateImage: (state, {payload}) => {
            state.user.picture = payload
            return state
        },
        setAllUsers: (state, {payload}) => {
            state.user.allUsers = payload
            return state
        }
    },
    extraReducers: {
        [fetchAvatar.fulfilled]: (state, {payload: {profilePicture, followers, followings}}) => {
            state.user = {...state.user, picture: profilePicture, followers, followings}
            return state
        },
        [fetchAvatar.rejected]: () => {
            console.log('Error get avatar')
        },
        
        [fetchAllUsers.fulfilled]: (state, {payload}) => {
            state.user.allUsers = payload
            return state
        },
        [fetchAllUsers.rejected]: () => {
            console.log('Error fetching all users')
        },
        [fetchFollow.fulfilled]: (state, {payload}) => {
            if(payload?.success)
                state.user.followings.push(payload._id)
            return state
        },
        [fetchAllUsers.rejected]: () => {
            console.log('Error fetching follow user')
        },
        [fetchUnFollow.fulfilled]: (state, {payload}) => {
            if(payload?.success)
                state.user.followings = state.user.followings.filter(id => id !== payload._id)
            return state
        },
        [fetchAllUsers.rejected]: () => {
            console.log('Error fetching all users')
        }
    }
})

export const { logIn, logOut, updateImage, setAllUsers } = userSlice.actions
export default userSlice.reducer