import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { suggistion } from '../../apis/api'

export const fetchAllUsers = createAsyncThunk('usersSlice/fetchAllUsers', suggistion)

const usersSlice = createSlice({
    name: 'users', 
    initialState: {users: [], onlines: []},
    reducers: {
        getOnlines: (state, {payload}) => {
            state.onlines = payload
            return state
        },
        addOnline: (state, {payload}) => {
            state.onlines.push(payload)
            return state
        },
        removeOnline: (state, {payload}) => {
            state.onlines = state.onlines.filter(e => e.socketId !== payload)
            return state
        }
    },
    extraReducers: {
        [fetchAllUsers.fulfilled]: (state, {payload}) => {
            state.users = payload
        },
        [fetchAllUsers.rejected]: () => {
            console.log('fetching all users error')
        }
    }
})

export const { getOnlines, addOnline, removeOnline } = usersSlice.actions
export default usersSlice.reducer