import { configureStore } from '@reduxjs/toolkit';
import { userAPI } from './api/userAPI';
import { userReducer } from './reducer/userReducer';
import { productAPI } from './api/productAPI';
import { cartReducer } from './reducer/cartReducer';
import { orderAPI } from './api/orderAPI';
import { dashBoardAPI } from './api/dashBoardAPI';

export const server = import.meta.env.VITE_SERVER;
export const store = configureStore({
    reducer:{
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [dashBoardAPI.reducerPath]: dashBoardAPI.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAPI.middleware).concat(productAPI.middleware).concat(orderAPI.middleware).concat(dashBoardAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>
