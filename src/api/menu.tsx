import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
const apiUrl: any ="http://127.0.0.1:8000/api/v1";
console.log(apiUrl);


const apiMenu = createApi({
    reducerPath: "menu",
    tagTypes: ["Menu"],
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        getAllMenu: builder.query({
            query: (token: any) => ({
                url: `/getproductincategory`,
                method: "GET",
                // headers: { "Authorization": `Bearer ${token}` }
                headers: { "Authorization": `Bearer ${token}` }
            }),
            providesTags: ["Menu"],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: `products/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Menu"],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: `category/`,
                method: "POST",
                headers: { "Authorization": `Bearer ${data?.token}` },
                body: data?.data,
            }),
            invalidatesTags: ["Menu"],
        }),
    }),
});
export const {
    useGetAllMenuQuery,
    useCreateProductMutation,
    useCreateCategoryMutation
} = apiMenu;
export const productReducer = apiMenu.reducer;
export default apiMenu;