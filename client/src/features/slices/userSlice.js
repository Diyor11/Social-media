import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAvatar } from '../../apis/api'

export const fetchAvatar = createAsyncThunk('userSlice/fetchAvatar', getAvatar)

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
        [fetchAvatar.fulfilled]: (state, {payload: {profilePicture, friends}}) => {
            state.user = {...state.user, picture: profilePicture}
            return state
        },
        [fetchAvatar.rejected]: () => {
            console.log('Error get avatar')
        }
    }
})

export const { logIn, logOut, updateImage, setAllUsers } = userSlice.actions
export default userSlice.reducer