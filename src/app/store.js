import { configureStore } from "@reduxjs/toolkit";

import adminDashboardSlice from "./reducers/admin-dashboard.js";
import productSlice from "./reducers/product.js";
import userSlice from "./reducers/user.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    admin: adminDashboardSlice,
  },
});
