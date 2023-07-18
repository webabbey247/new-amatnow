import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBestSeller: true,
  isEssentials: true,
  isNearby: true,
  isBudgetFriendly: true,
  isPopular: true,
};

const restuarantSlice = createSlice({
  name: "Restuarant",
  initialState,
  reducers: {
    setBestSellerRestuarant: (state, action) => {
      state.isBestSeller = action.payload;
    },
    setEssentialsRestuarant: (state, action) => {
      state.isEssentials = action.payload;
    },
    setNearbyRestuarant: (state, action) => {
      state.isNearby = action.payload;
    },
    setBudgetFriendlyRestuarant: (state, action) => {
      state.isBudgetFriendly = action.payload;
    },
    setPopularRestuarant: (state, action) => {
      state.isPopular = action.payload;
    },
  },
});

const { reducer, actions } = restuarantSlice;

export const {
  setBestSellerRestuarant,
  setEssentialsRestuarant,
  setNearbyRestuarant,
  setBudgetFriendlyRestuarant,
  setPopularRestuarant,
} = actions;

export default reducer;
