import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authApi } from '../features/auth/authSlice'
import { saveCalculationApi } from '../features/calculator/saveSlice'
import calculatorReducer from '../features/calculator/calculatorSlice'
import userReducer from '../features/auth/authStateSlice'

export const store = configureStore({
    reducer: {
        calculator: calculatorReducer,
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [saveCalculationApi.reducerPath]: saveCalculationApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( authApi.middleware, saveCalculationApi.middleware, ),
})

setupListeners(store.dispatch)
