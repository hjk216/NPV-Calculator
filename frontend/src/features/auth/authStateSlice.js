import { createSlice } from '@reduxjs/toolkit'
import { useCookies } from 'react-cookie'

const authStateSlice = createSlice({
    name: 'user',
    initialState: {
        token: ''
    },
    reducers: {
        setStateCookie(state) {
            if(useCookies(['Token'])) {
                state.token = useCookies(['Token'])[0].token
            }
        }
    }
})

export const { setStateCookie } = authStateSlice.actions
export default authStateSlice.reducer

