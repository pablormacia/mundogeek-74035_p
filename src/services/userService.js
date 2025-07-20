import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_BASE_RTDB_URL

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`
        }),
        putProfileImage: builder.mutation({
            query: (data) => ({
                url: `profileImages/${data.localId}.json`,
                method: 'PUT',
                body: {
                    image: data.image
                }
            })
        })
    })

})

export const { useGetProfileImageQuery, usePutProfileImageMutation } = userApi