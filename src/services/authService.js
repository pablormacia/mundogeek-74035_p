import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAuthUrl = process.env.EXPO_PUBLIC_BASE_AUTH_URL
const apiKey = process.env.EXPO_PUBLIC_AUTH_KEY

export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({ baseUrl: baseAuthUrl }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (auth) => ({
                url: `accounts:signUp?key=${apiKey}`,
                method: 'POST',
                body: auth
            })
        }),
        login: builder.mutation({
            query: (auth) => ({
                url: `accounts:accounts:signInWithPassword?key=${apiKey}`,
                method: 'POST',
                body: auth
            })
        })
    })

})

export const { useSignupMutation, useLoginMutation } = authApi