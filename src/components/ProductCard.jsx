import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

import { CiShare2 } from "react-icons/ci";
import { FaStar, FaWhatsapp } from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoCart, IoCartOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { fetchProducts } from "../app/actions/product";

const ProductCard = ({ product }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const likeHandler = async (e) => {
    e.target.style.pointerEvents = "none";
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER}/api/v1/users/liked-products/add`,
      { userId: user._id, productId: product._id }
    );
    toast.success(res.data.message);
    e.target.style.pointerEvents = "auto";
    fetchProducts(dispatch);
  };
  const unlikeHandler = async (e) => {
    e.target.style.pointerEvents = "none";

    const res = await axios.put(
      `${import.meta.env.VITE_SERVER}/api/v1/users/liked-products/remove`,
      { userId: user._id, productId: product._id }
    );
    toast.success(res.data.message);
    e.target.style.pointerEvents = "auto";
    fetchProducts(dispatch);
  };

  const addToCartHandler = async (e) => {
    e.target.style.pointerEvents = "none";
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER}/api/v1/users/cart/add`,
      {
        userId: user._id,
        productId: product._id,
      }
    );
    toast.success(res.data.message);
    e.target.style.pointerEvents = "auto";
    fetchProducts(dispatch);
  };
  const removeFromCartHandler = async (e) => {
    e.target.style.pointerEvents = "none";
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER}/api/v1/users/cart/remove`,
      { userId: user._id, productId: product._id }
    );
    toast.success(res.data.message);
    e.target.style.pointerEvents = "auto";
    fetchProducts(dispatch);
  };

  return (
    <div className="product-card">
      <Link to={`/shop/${product._id}`}>
        <Carousel
          photos={product.photos}
          effect={"coverflow"}
          slidesPerView={1}
          modules={[Pagination, Autoplay, EffectCoverflow]}
          coverflowEffect={false}
          autoplay={true}
        />
        <div className="product-details-section">
          <div className="product-details">
            <h3>{product.name}</h3>
            <span>{product.category}</span>
          </div>
          <div className="product-rating">
            (
            {product.rating.length == 0
              ? 0
              : product.rating.length == 1
              ? product.rating[0].rating
              : product.rating.reduce((acc, cur) => {
                  return (acc.rating + cur.rating) / product.rating.length;
                })}
            /5)
            <FaStar />
          </div>
        </div>
      </Link>
      <div className="product-interactive-buttons">
        <Link
          to={`https://wa.me/8625833128?text=I'm%20Interested%20in%20purchasing%20the%20following%20product:%0a${product.name},%0ahttp://localhost:5173/shop/${product._id}`}
        >
          order via <FaWhatsapp />
        </Link>
        <div>
          {user ? (
            product.likedBy.includes(user._id) ? (
              <IoMdHeart onClick={unlikeHandler} color="red" />
            ) : (
              <IoMdHeartEmpty onClick={likeHandler} />
            )
          ) : (
            <IoMdHeartEmpty
              style={{ cursor: "not-allowed" }}
              onClick={() => toast.error("Please log in to like this product.")}
            />
          )}
          {user ? (
            product.cartedBy.includes(user._id) ? (
              <IoCart onClick={removeFromCartHandler} />
            ) : (
              <IoCartOutline onClick={addToCartHandler} />
            )
          ) : (
            <IoCartOutline
              style={{ cursor: "not-allowed" }}
              onClick={() =>
                toast.error("Please log in to add this item to your cart.")
              }
            />
          )}

          <CiShare2 />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
