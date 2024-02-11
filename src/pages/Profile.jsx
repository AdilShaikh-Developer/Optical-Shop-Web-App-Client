import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";

import "../styles/profile.scss";
import { CiShare1 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikedProducts } from "../app/actions/user";

const Profile = ({ user }) => {
  const { loading, likedProducts } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchLikedProducts(dispatch, user._id);
  }, []);
  return loading ? (
    <SkeletonLoader width="100%" length={12} />
  ) : (
    <div className="profile-page">
      <div className="profile">
        {user.photo ? <img src={user.photo} /> : <CgProfile />}
        <h3>{user.name}</h3>
        <span>{user.email}</span>
        {/* <Link>Edit Profile</Link> */}
      </div>
      <div className="liked-products">
        <h3>
          <CiShare1 /> LIKED PRODUCTS
        </h3>
        {likedProducts.length > 0 ? (
          likedProducts.map((likedProduct) =>
            products
              .filter((product) => {
                return product._id === likedProduct;
              })
              .map((product) => (
                <ProductCard product={product} key={product._id} />
              ))
          )
        ) : (
          <div className="not-product-liked-message-container">
            <span>No Liked Products Available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
