import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        register: builder.mutation({
            query(body) {
                return {
                    url: '/register',
                    method: 'POST',
                    body,
                }
            }
        }),
        login: builder.mutation({
            query(body) {
                return {
                    url: '/login',
                    method: 'POST',
                    body,
                }
            }
        }),
        logout: builder.mutation({
            query(body) {
                return {
                    url: '/logout',
                    method: 'POST',
                    headers: {
                        'Authorization' : 'Token ' + body.token
                    }
                }
            }
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
} = authApi
