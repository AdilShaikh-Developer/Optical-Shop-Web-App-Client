import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    user: null,
    likedProducts: [],
    cartItems: [],
  },
  reducers: {
    userAuthentication: (state, action) => {
      state.loading = true;
      state.user = action.payload;
      state.loading = false;
    },
    userLikedProduct: (state, action) => {
      state.loading = true;
      state.likedProducts = action.payload;
      state.loading = false;
    },
    userCartItems: (state, action) => {
      state.loading = true;
      state.cartItems = action.payload;
      state.loading = false;
    },
    userLogout: (state) => {
      state.loading = true;
      state.user = null;
      state.loading = false;
    },
    userIsUnAuthenticated: (state) => {
      state.loading = false;
    },
  },
});

export const {
  userAuthentication,
  userLogout,
  userIsUnAuthenticated,
  userLikedProduct,
  userCartItems,
} = userSlice.actions;
export default userSlice.reducer;
