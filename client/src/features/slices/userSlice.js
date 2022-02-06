import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAvatar, suggistion } from '../../apis/api'

export const fetchAvatar = createAsyncThunk('postSlice/fetchAvatar', getAvatar)

export const fetchAllUsers = createAsyncThunk('postSlice/fetchAllUsers', suggistion)

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
        [fetchAvatar.fulfilled]: (state, {payload}) => {
            if(payload)
                state.user.picture = payload
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
        }
    }
})

export const { logIn, logOut, updateImage, setAllUsers } = userSlice.actions
export default userSlice.reducer