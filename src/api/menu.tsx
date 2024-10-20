import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";

const apiUrl: any = import.meta.env.VITE_API_URL;

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
        getOneProduct: builder.query({
            query: (id: any) => `/products/${id}/`,
            providesTags: ["Menu"],
        }),
        getAllCategory: builder.query({
            query: (token) => ({
                url: `/category/`,
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            }),
            providesTags: ["Menu"],
        }),
        getToppingInProductInCategory: builder.query({
            query: (data) => ({
                url: `/product/${data?.id}`,
                method: "GET",
                headers: { "Authorization": `Bearer ${data?.token}` },
            }),
            providesTags: ["Menu"],
        }),
        updateToppingInProduct: builder.mutation({
            query: ({ id, product }: any) => ({
                url: `product/${id}/update`,
                method: "PUT",
                body: product,
            }),
            invalidatesTags: ["Menu"],
        }),
    }),
});
export const {
    useGetAllMenuQuery,
    useCreateProductMutation,
    useCreateCategoryMutation,
    useGetOneProductQuery,
    useGetAllCategoryQuery,
    useGetToppingInProductInCategoryQuery,
    useUpdateToppingInProductMutation
} = apiMenu;
export const productReducer = apiMenu.reducer;
export default apiMenu;