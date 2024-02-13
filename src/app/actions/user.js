import axios from "axios";
import toast from "react-hot-toast";
import {
  userAuthentication,
  userCartItems,
  userIsUnAuthenticated,
  userLikedProduct,
} from "../reducers/user";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-auth";

export const authenticateUser = async (user) => {
  if (user) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/auth`,
        {
          _id: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        "Authentication Failed: Unable to verify your identity. Please try again"
      );
    }
  } else {
    toast.error("Authentication Error");
  }
};

export const fetchUser = async (dispatch, userId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/v1/users/profile`,
      { id: userId }
    );

    dispatch(userAuthentication(res.data.response));
  } catch (error) {
    // toast.error("Failed to find user. Try again");
    // console.log(error);
    console.log("error", error);
  }
};

export const fetchLikedProducts = async (dispatch, userId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/v1/users/liked-products`,
      { userId }
    );
    dispatch(userLikedProduct(res.data.response));
  } catch (error) {
    toast.error("Failed to find liked products. Try again");
  }
};

export const fetchCartItems = async (dispatch, userId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/v1/users/cart`,
      {
        userId,
      }
    );
    dispatch(userCartItems(res.data.response));
  } catch (error) {
    toast.error("Failed to find cart items. Try again");
  }
};
