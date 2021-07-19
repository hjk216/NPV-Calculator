import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



const baseQuery = fetchBaseQuery({
    baseUrl: '/api/calculation',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token
      if(token) {
        headers.set('Authorization', `Token ` + token)
      }
  
      return headers
    },
  })



export const saveCalculationApi = createApi({
    reducerPath: 'saveCalculation',
    baseQuery: baseQuery,
    tagTypes: ['Calc'],
    endpoints: (builder) => ({
        getAllCalc: builder.query({
            query: () => '',
            providesTags: ['Calc'],
        }),
        addCalc: builder.mutation({
            query(body) {
                return {
                    url: '/',
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Calc'],
        }),
        deleteCalc: builder.mutation({
            query(id) {
                return {
                    url: `/${id}/`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Calc', id: arg.id }],
        })
    })
})



export const {
    useGetAllCalcQuery,
    useAddCalcMutation,
    useDeleteCalcMutation
} = saveCalculationApi
