import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const firebaseRTDBUrl = process.env.EXPO_PUBLIC_BASE_RTDB_URL
export const shopApi = createApi({
    reducerPath:'shopApi',
    baseQuery: fetchBaseQuery({baseUrl: firebaseRTDBUrl}),
    endpoints: (builder) => ({
        getCategories: builder.query({query:()=>'categories.json'}),
        getProductsByCategory: builder.query({
            query: (category)=>`products.json?orderBy="category"&equalTo="${category.toLowerCase()}"`,
            transformResponse: (response) => {
            // Convertir objeto en array
            return Object.values(response)
            }
        })
    })
})

export const {useGetCategoriesQuery,useGetProductsByCategoryQuery} = shopApi