// Importing Modules
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// Importing Pages
import Home from "./pages/Home";

// Importing Components
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/Protected-Route";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import CreateProduct from "./pages/admin/CreateProduct";
import CustomerDashboard from "./pages/admin/CustomerDashboard";
import EditProduct from "./pages/admin/EditProduct";
import ProductDashboard from "./pages/admin/ProductDashboard";
import Dashboard from "./pages/admin/Dashboard";

import PageNotFound from "./pages/PageNotFound";

// Importing CSS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedProducts, fetchProducts } from "./app/actions/product";
import { fetchUser } from "./app/actions/user";
import "./styles/app.scss";
import {
  fetchAdminDashboardStats,
  fetchDashboardCustomers,
  fetchDashboardProducts,
} from "./app/actions/admin-dashboard";

const App = () => {
  const { loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser(dispatch);
    fetchProducts(dispatch);
    fetchFeaturedProducts(dispatch);

    fetchDashboardProducts(dispatch);
    fetchDashboardCustomers(dispatch);
    fetchAdminDashboardStats(dispatch);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Navbar user={user} />
      <Routes>
        {/* Unauthenticated User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />

        <Route
          path="/auth"
          element={
            <ProtectedRoute isAuthenticated={user ? false : true}>
              <Auth />
            </ProtectedRoute>
          }
        />

        {/* Authenticated User Routes  */}
        {/* <ProtectedRoute> */}
        <Route path="/user/:id" element={<Profile user={user} />} />
        <Route path="/user/cart-items" element={<Cart />} />
        {/* </ProtectedRoute> */}

        {/* Admin Routes Below */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route
          path="/admin/products-dashboard"
          element={<ProductDashboard />}
        />
        <Route
          path="/admin/products-dashboard/create"
          element={<CreateProduct />}
        />
        <Route path="/admin/products-dashboard/:id" element={<EditProduct />} />

        <Route
          path="/admin/customer-dashboard"
          element={<CustomerDashboard />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* Footer will be here */}
      <Footer />
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
