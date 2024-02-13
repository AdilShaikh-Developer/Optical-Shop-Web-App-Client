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
import { auth } from "./firebase-auth";
import { onAuthStateChanged } from "firebase/auth";
import { userIsUnAuthenticated } from "./app/reducers/user";

const App = () => {
  const { loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUser(dispatch, user.uid);
      } else {
        dispatch(userIsUnAuthenticated());
      }
    });
    fetchFeaturedProducts(dispatch);
    fetchDashboardProducts(dispatch);
    fetchDashboardCustomers(dispatch);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />

        {/* Unauthenticated User Routes */}
        <Route
          path="/auth"
          element={
            <ProtectedRoute
              Component={Auth}
              user={user ? false : true}
              isAdminRoute={false}
            />
          }
        />
        {/* Unauthenticated User Routes */}

        {/* Authenticated User Routes */}
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute
              Component={Profile}
              user={user ? true : false}
              isAdminRoute={false}
            />
          }
        />
        <Route
          path="/user/cart-items"
          element={
            <ProtectedRoute
              Component={Cart}
              user={user ? true : false}
              isAdminRoute={false}
            />
          }
        />
        {/* Authenticated User Routes */}

        {/* Only Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              Component={Dashboard}
              user={user ? true : false}
              isAdminRoute={true}
              admin={user ? (user.role === "admin" ? true : false) : null}
            />
          }
        />
        <Route
          path="/admin/products-dashboard"
          element={
            <ProtectedRoute
              Component={ProductDashboard}
              user={user ? true : false}
              isAdminRoute={true}
              admin={user ? (user.role === "admin" ? true : false) : null}
            />
          }
        />
        <Route
          path="/admin/products-dashboard/create"
          element={
            <ProtectedRoute
              Component={CreateProduct}
              user={user ? true : false}
              isAdminRoute={true}
              admin={user ? (user.role === "admin" ? true : false) : null}
            />
          }
        />
        <Route
          path="/admin/products-dashboard/:id"
          element={
            <ProtectedRoute
              Component={EditProduct}
              user={user ? true : false}
              isAdminRoute={true}
              admin={user ? (user.role === "admin" ? true : false) : null}
            />
          }
        />

        <Route
          path="/admin/customer-dashboard"
          element={
            <ProtectedRoute
              Component={CustomerDashboard}
              user={user ? true : false}
              isAdminRoute={true}
              admin={user ? (user.role === "admin" ? true : false) : null}
            />
          }
        />
        {/* Only Admin Routes */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* Footer will be here */}
      <Footer />
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
