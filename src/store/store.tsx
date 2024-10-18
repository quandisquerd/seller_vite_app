
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import apiMenu from '../api/menu';
import apiAuth from '../api/auth';
import apiRestaurant from '../api/restaurant';
import countryApi from '../api/map';
import apiTopping from '../api/topping';



export const store = configureStore({
    reducer: {
        [apiMenu.reducerPath]: apiMenu.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer,
        [apiRestaurant.reducerPath]: apiRestaurant.reducer,
        [countryApi.reducerPath]: countryApi.reducer,
        [apiTopping.reducerPath]: apiTopping.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiMenu.middleware, apiAuth.middleware, apiRestaurant.middleware, countryApi.middleware, apiTopping.middleware),

});

setupListeners(store.dispatch);
