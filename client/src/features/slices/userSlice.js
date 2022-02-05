import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAvatar } from '../../apis/api'

export const fetchAvatar = createAsyncThunk('postSlice/fetchAvatar', getAvatar)

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
        }
    }
})

export const { logIn, logOut, updateImage } = userSlice.actions
export default userSlice.reducer