import { apiSlice } from "../api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: ({ restuarantID, identifierID }) =>
        `cart?restaurant_id=${restuarantID}&identifier=${identifierID}`,
      providesTags: ["Cart"],
      refetchOnMountOrArgChange: true,
    }),

    getRestuarantCart: builder.query({
      query: () => "cart/restaurants",
      providesTags: ["RestuarantCart"],
      refetchOnMountOrArgChange: true,
    }),

    postMenuToCart: builder.mutation({
      query: (credentials) => ({
        url: "cart",
        method: "post",
        body: { ...credentials },
      }),
      invalidatesTags: ["Cart", "RestuarantCart"],
    }),

    patchMenuToCart: builder.mutation({
      query: ({ cartID, ...rest }) => ({
        url: `cart/${cartID}`,
        method: "patch",
        body: rest,
      }),
      invalidatesTags: ["Cart"],
    }),

    addCoupon: builder.query({
      query: ({ restuarantID, discountCode }) =>
        `cart/discounts?restaurant_id=${restuarantID}&discount_code=${discountCode}`,
      providesTags: ["AddCoupon"],
    }),

    deleteCartMenuItem: builder.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Cart", "RestuarantCart"],
    }),

    createOrder: builder.mutation({
      query: ({ longitude, latitude, ...reset }) => ({
        url: `orders?lat=${latitude}&long=${longitude}`,
        method: "post",
        body: reset,
      }),
    }),

    payOrder: builder.mutation({
      query: ({ id, ...reset }) => {
        return {
          url: `orders/${id}/pay`,
          method: "post",
          body: reset,
        };
      },
    }),
    getAllOrders: builder.query({
      query: ({ page, status }) => `orders?status=${status}&page=${page}`,
      providesTags: ["AllOrders"],
    }),

    getSingleOrder: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: ["SingleOrder"],
    }),

    reOrderMenu: builder.query({
      query: (orderID) => `orders/${orderID}/reorder`,
      providesTags: ["ReOrderMenu"],
    }),

    getDeliveriesHistory: builder.query({
      query: (page) => `logistics/history?page=${page}`,
      providesTags: ["AllDeliveriesHistory"],
    }),
    getRequestHistory: builder.query({
      query: (page) => `logistics/anything/history?page=${page}`,
      providesTags: ["AllRequestHistory"],
    }),
  }),
});

export const {
  useAddMenuToCartMutation,
  usePostMenuToCartMutation,
  usePatchMenuToCartMutation,
  // useUpdateCartMenuItemMutation,
  useDeleteCartMenuItemMutation,
  useGetCartQuery,
  useGetRestuarantCartQuery,
  useLazyAddCouponQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useGetAllOrdersQuery,
  useLazyGetSingleOrderQuery,
  // useGetSingleOrderQuery,
  useLazyReOrderMenuQuery,
  useGetDeliveriesHistoryQuery,
  useGetRequestHistoryQuery,
} = cartApiSlice;
