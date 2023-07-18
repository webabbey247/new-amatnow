import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setUserDetails: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setUserDetails, logOut } = authSlice.actions;
export default authSlice.reducer;
