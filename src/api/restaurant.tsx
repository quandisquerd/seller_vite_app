import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
const apiUrl: any = "http://127.0.0.1:8000/api/v1";
console.log(apiUrl);


const apiRestaurant = createApi({
    reducerPath: "restaurant",
    tagTypes: ["Restaurant"],
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        checkRestaurant: builder.query({
            query: (id: any) => `/restaurant/checkRestaurant/${id}`,
            providesTags: ["Restaurant"],
        }),
        restaurantType: builder.query({
            query: () => `/restaurantType/getAllRestaurantType`,
            providesTags: ["Restaurant"],
        }),
        createRestaurant: builder.mutation({
            query: (data) => ({
                url: `/restaurant/createRestaurant`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }),
            invalidatesTags: ["Restaurant"],
        }),
    }),
});
export const {
    useCheckRestaurantQuery,
    useRestaurantTypeQuery,
    useCreateRestaurantMutation
} = apiRestaurant;
export const productReducer = apiRestaurant.reducer;
export default apiRestaurant;