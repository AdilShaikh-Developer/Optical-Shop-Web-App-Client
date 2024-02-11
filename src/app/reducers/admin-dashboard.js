import { createSlice } from "@reduxjs/toolkit";

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    loading: true,
    dashboardStats: null,
    dashboardProducts: null,
    dashboardCustomers: null,
    product: null,
  },
  reducers: {
    fetchDashboardStats: (state, action) => {
      state.loading = true;
      state.dashboardStats = action.payload;
      state.loading = false;
    },
    DashboardProducts: (state, action) => {
      state.loading = true;
      state.dashboardProducts = action.payload;
      state.loading = false;
    },
    product: (state, action) => {
      state.loading = true;
      state.product = action.payload;
      state.loading = false;
    },
    dashboardCustomers: (state, action) => {
      state.loading = true;
      state.dashboardCustomers = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchDashboardStats,
  DashboardProducts,
  product,
  dashboardCustomers,
} = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
