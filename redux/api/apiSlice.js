import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { logOut } from "../auth/authSlice";
const BASE_URL = "https://api.staging.amatnow.com/api/v1";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    // console.log("hello token", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    api.dispatch(logOut());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "AuthUser",
    "CountryList",
    "Restuarant",
    "SingleRestuarantMenuCategory",
    "SingleRestuarant",
    "RestuarantMenus",
    "SingleRestuarantMenu",
    "SingleRestuarantReviews",
    "Cart",
    "RestuarantCart",
    "AddCoupon",
    "AllAddresses",
    "SingleAddress",
    "AllOrders",
    "AllDeliveriesHistory",
    "AllRequestHistory",
    "Promotions",
    "SingleOrder",
    "ReOrderMenu",
  ],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
