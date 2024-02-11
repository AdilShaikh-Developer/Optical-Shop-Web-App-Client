import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./reducers/user.js";
import productSlice from "./reducers/product.js";
import adminDashboardSlice from "./reducers/admin-dashboard.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    admin: adminDashboardSlice,
  },
});
