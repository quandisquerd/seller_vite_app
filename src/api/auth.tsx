import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
const apiUrl: any = "http://127.0.0.1:8000/api/v1";
console.log(apiUrl);


const apiAuth = createApi({
    reducerPath: "auth",
    tagTypes: ["Auth"],
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        registerSerler: builder.mutation({
            query: (data) => ({
                url: `authserler/registerSerler`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Auth"],
        }),
        verifyOtpSerler: builder.mutation({
            query: (data) => ({
                url: `authserler/verifyotpSerler`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Auth"],
        }),
        setPassword: builder.mutation({
            query: (data) => ({
                url: `authserler/setPassword`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Auth"],
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `authserler/loginSerler`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Auth"],
        }),
    }),
});
export const {
    useLoginMutation,
    useRegisterSerlerMutation,
    useVerifyOtpSerlerMutation,
    useSetPasswordMutation,
} = apiAuth;
export const productReducer = apiAuth.reducer;
export default apiAuth;