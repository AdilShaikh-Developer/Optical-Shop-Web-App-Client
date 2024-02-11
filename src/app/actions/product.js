import axios from "axios";
import {
  storeProduct,
  storeProducts,
  storeFeaturedProducts,
  storeCategories,
  storeProcessFailed,
} from "../reducers/product";
import toast from "react-hot-toast";

export const fetchProduct = async (dispatch, productId) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/products/${productId}`
    );
    const productRating =
      res.data.response[0].rating.length === 0
        ? 0
        : res.data.response[0].rating.length === 1
        ? res.data.response[0].rating[0].rating
        : res.data.response[0].rating.reduce(
            (acc, cur) =>
              (acc.rating + cur.rating) / res.data.response[0].rating.length
          );

    const starRating = [];
    for (let index = 5; index >= 1; index--) {
      const rating =
        (res.data.response[0].rating.filter((currentRating) => {
          return currentRating.rating == index;
        }).length /
          res.data.response[0].rating.length) *
        100;
      starRating[index - 1] = isNaN(rating) ? 0 : rating;
    }

    dispatch(
      storeProduct({ product: res.data.response[0], productRating, starRating })
    );
  } catch (error) {
    dispatch(storeProcessFailed());
    toast.error("product is currently unavailable, try again!");
    console.log(error);
  }
};

export const fetchProducts = async (dispatch) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/products`
    );
    dispatch(storeProducts(res.data.response));
  } catch (error) {
    dispatch(storeProcessFailed());
    toast.error("products are unavailable");
  }
};

export const fetchFeaturedProducts = async (dispatch) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/featured-products`
    );
    dispatch(storeFeaturedProducts(res.data.response));
  } catch (error) {
    dispatch(storeProcessFailed());
    toast.error("products are unavailable");
  }
};

export const fetchCategories = async (dispatch) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/products/categories`
    );
    dispatch(storeCategories(res.data.response));
  } catch (error) {
    dispatch(storeProcessFailed());
    toast.error("products are unavailable");
  }
};
