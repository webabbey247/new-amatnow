import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../auth/authSlice";
import generalReducer from "../general/generalSlice";
import cartReducer from "../cart/cartSlice";
import restuarantReducer from "../restuarant/restuarantSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    general: generalReducer,
    cart: cartReducer,
    restuarant: restuarantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
setupListeners(store.dispatch);
