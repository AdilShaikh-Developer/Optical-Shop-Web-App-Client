import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: true,
    product: {
      product: null,
      productRating: null,
    },
    products: null,
    featuredProducts: null,
    categories: null,
  },
  reducers: {
    storeProduct: (state, action) => {
      state.loading = true;
      state.product = action.payload;
      state.loading = false;
    },
    storeProducts: (state, action) => {
      state.loading = true;
      state.products = action.payload;
      state.loading = false;
    },
    storeFeaturedProducts: (state, action) => {
      state.loading = true;
      state.featuredProducts = action.payload;
      state.loading = false;
    },
    storeCategories: (state, action) => {
      state.loading = true;
      state.categories = action.payload;
      state.loading = false;
    },
    storeProcessFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  storeProduct,
  storeProducts,
  storeFeaturedProducts,
  storeCategories,
  storeProcessFailed,
} = productSlice.actions;
export default productSlice.reducer;
