import { apiSlice } from "../api/apiSlice";

export const restaurantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRestuarant: builder.query({
      query: ({ slug, page, long, lat }) =>
        slug
          ? `restaurant?${slug}&long=${long}&lat=${lat}&page=${page}`
          : `restaurant?long=${long}&lat=${lat}&page=${page}`,
      providesTags: ["Restuarant"],
      refetchOnMountOrArgChange: true,
    }),

    // getAllRestuarant: builder.query({
    //   query: ({
    //     restuarantName,
    //     speciality,
    //     explore,
    //     essentials,
    //     favorite,
    //     bestSeller,
    //   }) =>
    //     `restaurant?name=${restuarantName}&speciality=${speciality}&${explore}=true&${essentials}=true&${favorite}=true&${bestSeller}=true`,
    //   providesTags: ['Restuarant'],
    //   refetchOnMountOrArgChange: true,
    // }),

    getSingleRestuarant: builder.query({
      query: (id) => `restaurant/${id}`,
      providesTags: ["SingleRestuarant"],
    }),

    getRestuarantMenu: builder.query({
      query: (id) => `restaurant/${id}/menus`,
      providesTags: ["RestuarantMenus"],
    }),

    getSingleRestuarantMenuCategory: builder.query({
      query: ({ restuarantID, menuCategoryName }) =>
        `restaurant/${restuarantID}/menus?category=${menuCategoryName}`,
      providesTags: ["SingleRestuarantMenuCategory"],
    }),

    getSingleRestuarantMenu: builder.query({
      query: ({ restuarantID, menuCategoryID }) =>
        `restaurant/${restuarantID}/menus/${menuCategoryID}`,
      providesTags: ["SingleRestuarantMenu"],
    }),

    getSingleRestuarantReviews: builder.query({
      query: (id) => `restaurant/${id}/reviews`,
      providesTags: ["SingleRestuarantReviews"],
    }),

    favoriteRestuarant: builder.mutation({
      query: (id, ...credentials) => ({
        url: `restaurant/${id}/favourite`,
        method: "post",
        body: { ...credentials },
      }),
      invalidatesTags: ["Restuarant"],
    }),

    unFavoriteRestuarant: builder.mutation({
      query: (id, ...credentials) => ({
        url: `restaurant/${id}/unfavourite`,
        method: "post",
        body: { ...credentials },
      }),
      invalidatesTags: ["Restuarant"],
    }),

    favoriteRestuarantMenu: builder.mutation({
      query: ({id, menuID}) => ({
        url: `restaurant/${id}/menus/${menuID}/favourite`,
        // url: `restaurant/968c4e0a-0b70-4d7e-a439-eb6661f42e2d/menus/968c5a90-c28e-46b7-8291-40ad4ed2be7d/favourite`,
        method: "post",
        body: {},
      }),
      invalidatesTags: ["SingleRestuarantMenu", "SingleRestuarantMenuCategory"],
    }),

    unFavoriteRestuarantMenu: builder.mutation({
      query: ({id, menuID}) => ({
        url: `restaurant/${id}/menus/${menuID}/favourite`,
        // url: `restaurant/968c4e0a-0b70-4d7e-a439-eb6661f42e2d/menus/968c5a90-c28e-46b7-8291-40ad4ed2be7d/favourite`,
        method: "delete",
        body: {},
      }),
      invalidatesTags: ["SingleRestuarantMenu", "SingleRestuarantMenuCategory"],
    }),
  }),
});

export const {
  useGetAllRestuarantQuery,
  useGetSingleRestuarantMenuCategoryQuery,
  useGetSingleRestuarantQuery,
  useGetRestuarantMenuQuery,
  useGetSingleRestuarantMenuQuery,
  useGetSingleRestuarantReviewsQuery,
  useFavoriteRestuarantMutation,
  useUnFavoriteRestuarantMutation,
  useFavoriteRestuarantMenuMutation,
  useUnFavoriteRestuarantMenuMutation,
} = restaurantApiSlice;
