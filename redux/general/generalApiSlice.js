import { apiSlice } from "../api/apiSlice";

export const generalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountryList: builder.query({
      query: () => "utilities/countries",
      providesTags: ["CountryList"],
    }),
    getAllUserAddress: builder.query({
      query: () => "user/address",
      providesTags: ["AllAddresses"],
    }),
    getSingleUserAddress: builder.query({
      query: (id) => `user/address/${id}`,
      providesTags: ["SingleAddress"],
    }),
    saveUserAddress: builder.mutation({
      query: (credentials) => ({
        url: "user/address",
        method: "post",
        body: { ...credentials },
      }),
      invalidatesTags: ["AllAddresses"],
    }),
    updateUserAddress: builder.mutation({
      query: (id) => ({
        url: `user/address/${id}`,
        method: "patch",
      }),
      invalidatesTags: ["AllAddresses"],
    }),
    setUserAddress: builder.mutation({
      query: (id) => ({
        url: `user/address/${id}/primary`,
        method: "patch",
      }),
      invalidatesTags: ["SingleAddress"],
    }),
    deleteUserAddress: builder.mutation({
      query: (id) => ({
        url: `user/address/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["AllAddresses", "SingleAddress"],
    }),
    getAllUserAddress: builder.query({
      query: () => "user/address",
      providesTags: "[AllAddresses]",
    }),
    getAllPromotions: builder.query({
      query: (page) => `utilities/promotions?page=${page}`,
      providesTags: ["Promotions"],
    }),
  }),
});

export const {
  useGetCountryListQuery,
  useGetAllUserAddressQuery,
  useGetSingleUserAddressQuery,
  useSaveUserAddressMutation,
  useUpdateUserAddressMutation,
  useSetUserAddressMutation,
  useDeleteUserAddressMutation,
  useGetAllPromotionsQuery,
} = generalApiSlice;
