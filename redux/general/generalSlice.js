import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    locationPermission: false,
    latitude: 0,
    longitude: 0,
    locationStatus: false,
    locationAddress: null,
    userAddressStatus: false,
    userAddressID: "",
    userAddress: null,
    noAuthID: null,
  },
  reducers: {
    setCoordinate: (state, action) => {
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
    },

    setLocationAddress: (state, action) => {
      state.locationAddress = action.payload;
    },

    setLocationStatus: (state, action) => {
      state.locationStatus = action.payload;
      state.locationPermission = action.payload;
    },

    setUserAddressInfo: (state, action) => {
      state.userAddressStatus = true;
      state.userAddressID = action.payload.id;
      state.userAddress = action.payload.address;
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
    },

    setNoAuthID: (state, action) => {
      state.noAuthID = action.payload;
    },
  },
});

export const {
  setCoordinate,
  setLocationAddress,
  setLocationStatus,
  setUserAddressInfo,
  setNoAuthID,
} = generalSlice.actions;
export default generalSlice.reducer;
