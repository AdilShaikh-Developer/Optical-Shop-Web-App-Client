import axios from "axios";
import {
  fetchDashboardStats,
  DashboardProducts,
  product,
  dashboardCustomers,
} from "../reducers/admin-dashboard";

export const fetchAdminDashboardStats = async (dispatch) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/admin-dashboard/stats`
    );
    dispatch(
      fetchDashboardStats({
        stats: res.data.stats,
        chart: res.data.chart,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchDashboardProducts = async (dispatch) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/admin-dashboard/products-data`
    );
    dispatch(DashboardProducts(res.data.response));
  } catch (error) {
    console.log(error);
  }
};

export const fetchDashboardCustomers = async (dispatch) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/admin-dashboard/customers-data`
    );
    dispatch(dashboardCustomers(res.data.response));
  } catch (error) {
    console.log(error);
  }
};

export const fetchDashboardProduct = async (dispatch, id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_SERVER
      }/api/v1/admin-dashboard/products-data/${id}`
    );
    dispatch(product(res.data.response));
  } catch (error) {}
};
