import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl: any = import.meta.env.VITE_API_URL;

const apiTopping = createApi({
    reducerPath: "topping",
    tagTypes: ["Topping"],
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        fetchFn: async (...args) => {
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        getAllTopping: builder.query({
            query: (token: any) => ({
                url: `/gettopping`,
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            }),
            providesTags: ["Topping"],

        }),
        getOneTopping: builder.query({
            query: (id: any) => `/topping/${id}/`,
            providesTags: ["Topping"],
        }),
        createSubtoppingInTopping: builder.mutation({
            query: (data) => ({
                url: `createsubtopping`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Topping"],
        }),
        updateViewSubtoppingInTopping: builder.mutation({
            query: ({ id, data }) => ({
                url: `/subtopping/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Topping"],
        }),
        updateTopping: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updatetopping/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Topping"],
        }),
        removeTopping: builder.mutation({
            query: (id) => ({
                url: `/topping/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Topping"],
        }),
        createTopping: builder.mutation({
            query: (data: any) => ({
                url: `/topping/`,
                method: "POST",
                headers: { "Authorization": `Bearer ${data?.token}` },
                body: data?.data,
            }),
            invalidatesTags: ["Topping"],
        }),
    }),
});
export const {
    useGetAllToppingQuery,
    useGetOneToppingQuery,
    useCreateSubtoppingInToppingMutation,
    useUpdateViewSubtoppingInToppingMutation,
    useUpdateToppingMutation,
    useRemoveToppingMutation,
    useCreateToppingMutation
} = apiTopping;
export const productReducer = apiTopping.reducer;
export default apiTopping;