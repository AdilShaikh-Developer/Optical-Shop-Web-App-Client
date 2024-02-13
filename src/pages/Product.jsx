// Importing Modules
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// Importing Components
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import SkeletonLoader from "../components/SkeletonLoader";

// Importing Redux Actions
import { fetchProduct } from "../app/actions/product";

// Importing React Icons
import { CiShare2 } from "react-icons/ci";
import { FaStar, FaStarHalf, FaWhatsapp } from "react-icons/fa";
import { IoIosArrowRoundBack, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoCart, IoCartOutline } from "react-icons/io5";

// Importing Stylesheets
import "../styles/product.scss";

const Product = () => {
  const { loading } = useSelector((state) => state.product);
  const { product, productRating, starRating } = useSelector(
    (state) => state.product.product
  );
  const { user } = useSelector((state) => state.user);

  const [ratingContainerMenu, setRatingContainerMenu] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");

  const dispatch = useDispatch();

  const likeHandler = async (e) => {
    e.target.style.pointerEvents = "none";
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER}/api/v1/users/liked-products/add`,
      { userId: user._id, productId: product._id }
    );
    toast.success(res.data.message);
    e.target.style.pointerEvents = "auto";
    fetchProduct(dispatch, product._id);
  };
  const unlikeHandler = async (e) => {
    e.target.style.pointerEvents = "none";

    const res = await axios.put(
      `${import.meta.env.VITE_SERVER}/api/v1/users/liked-products/remove`,
      { userId: user._id, productId: product._id }
    );
    toast.success(res.data.message);
    e.target.style.pointerEvents = "auto";
    fetchProduct(dispatch, product._id);
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
    fetchProduct(dispatch, product._id);
  };
  const removeFromCartHandler = async (e) => {
    e.target.style.pointerEvents = "none";
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER}/api/v1/users/cart/remove`,
      { userId: user._id, productId: product._id }
    );
    toast.success(res.data.message);
    e.target.style.pointerEvents = "auto";
    fetchProduct(dispatch, product._id);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const request = {
        userId: user._id,
        userProfile: user.photo,
        username: user.name,
        rating,
        review,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/products/${
          product._id
        }/ratings-and-reviews`,
        request
      );

      toast.success(res.data.message);
      fetchProduct(dispatch, product._id);
      setRatingContainerMenu(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchProduct(dispatch, window.location.href.slice(-24));
  }, [window.location.href]);
  return loading ? (
    <SkeletonLoader width="90%" length={15} />
  ) : product ? (
    <div className="product-page">
      <Link to={"/shop"} className="back-button">
        <IoIosArrowRoundBack />
      </Link>
      <div className="product-container">
        <div className="product-details-container">
          <Carousel
            photos={product.photos}
            effect={"coverflow"}
            slidesPerView={1}
            modules={[Pagination, Autoplay, EffectCoverflow]}
            coverflowEffect={false}
            autoplay={true}
          />
          <div className="product-heading-details">
            <h3>{product.name}</h3>
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
                  onClick={() =>
                    toast.error("Please log in to like this product.")
                  }
                />
              )}
              <CiShare2 />
            </div>
          </div>
          <div className="product-details">
            <h4>Product Details</h4>
            <div>
              <span>Category - {product.category}</span>
              <span>Frame Size - {product.size}</span>
              <span>Frame Shape - {product.shape}</span>
              <span>Frame Colour - {product.colour}</span>
            </div>
          </div>
        </div>
        <div className="reviews-and-rating-section">
          <h4>Review & Rating</h4>
          <div className="rating-container">
            <div className="existing-rating">
              <div>
                <div>
                  {productRating >= 5 ? (
                    <>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </>
                  ) : productRating >= 4.5 ? (
                    <>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </>
                  ) : productRating >= 4 ? (
                    <>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </>
                  ) : productRating >= 3.5 ? (
                    <>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </>
                  ) : productRating >= 3 ? (
                    <>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </>
                  ) : productRating >= 2.5 ? (
                    <>
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </>
                  ) : productRating >= 2 ? (
                    <>
                      <FaStar />
                      <FaStar />
                    </>
                  ) : productRating >= 1.5 ? (
                    <>
                      <FaStar />
                      <FaStarHalf />
                    </>
                  ) : productRating >= 1 ? (
                    <FaStar />
                  ) : productRating >= 0.5 ? (
                    <FaStarHalf />
                  ) : (
                    ""
                  )}
                </div>
                <span>({productRating}/5)</span>
              </div>
              <span>Rated by {product.rating.length} customer's</span>
            </div>
            <div className="existing-rating-chart-container">
              <div>
                5 <FaStar />
                <div className="vertical-bar-container">
                  <div
                    className="bar"
                    style={{ width: `${starRating[4]}%` }}
                  ></div>
                </div>
                {starRating[4]}%
              </div>
              <div>
                4 <FaStar />
                <div className="vertical-bar-container">
                  <div
                    className="bar"
                    style={{ width: `${starRating[3]}%` }}
                  ></div>
                </div>
                {starRating[3]}%
              </div>
              <div>
                3 <FaStar />
                <div className="vertical-bar-container">
                  <div
                    className="bar"
                    style={{ width: `${starRating[2]}%` }}
                  ></div>
                </div>
                {starRating[2]}%
              </div>
              <div>
                2 <FaStar />
                <div className="vertical-bar-container">
                  <div
                    className="bar"
                    style={{ width: `${starRating[1]}%` }}
                  ></div>
                </div>
                {starRating[1]}%
              </div>
              <div>
                1 <FaStar />
                <div className="vertical-bar-container">
                  <div
                    className="bar"
                    style={{ width: `${starRating[0]}%` }}
                  ></div>
                </div>
                {starRating[0]}%
              </div>
            </div>
            {user ? (
              product.rating.filter((e) => {
                return e.userId === user._id;
              }).length > 0 ? (
                <span>
                  Thank you for your review! Your feedback is valuable to us.
                </span>
              ) : (
                <button onClick={() => setRatingContainerMenu(true)}>
                  Rate Now
                </button>
              )
            ) : (
              <button
                onClick={() => {
                  toast.error(
                    "You need to login first for accessing rating feature"
                  );
                }}
              >
                Rate Now
              </button>
            )}
            <div className="review-container">
              {product.rating.map((rating, index) => (
                <div className="review-card" key={index}>
                  <div className="profie-picture">
                    <img src={rating.userProfile} alt="" />
                  </div>
                  <div className="review-details">
                    <div className="header">
                      <h5>{rating.username}</h5>
                      <span>
                        Rating: ({rating.rating} <span>/</span> 5)
                      </span>
                    </div>
                    <div className="body">{rating.review}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <Link
          to={`https://wa.me/8625833128?text=I'm%20Interested%20in%20purchasing%20the%20following%20product:%0a${
            product.name
          },%0a${import.meta.env.VITE_CLIENT}/shop/${product._id}`}
        >
          Order Via <FaWhatsapp />
        </Link>
        {user && product.cartedBy != undefined ? (
          product.cartedBy.includes(user._id) ? (
            <button onClick={removeFromCartHandler}>
              Remove From Cart
              <IoCart />
            </button>
          ) : (
            <button onClick={addToCartHandler}>
              Add To Cart
              <IoCartOutline />
            </button>
          )
        ) : (
          <button
            onClick={() =>
              toast.error("Please log in to add this item to your cart.")
            }
          >
            Add To Cart
            <IoCartOutline style={{ cursor: "not-allowed" }} />
          </button>
        )}
      </div>
      {ratingContainerMenu ? (
        <div
          className="give-rating-container"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <div className="rating-box">
            <button onClick={() => setRatingContainerMenu(false)}>
              <IoIosArrowRoundBack />
            </button>
            <h3>Share Your Experience</h3>
            <form onSubmit={submitHandler}>
              <div>
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                      />
                      <FaStar
                        className="star"
                        color={
                          currentRating <= (hover || rating)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        stroke="black"
                        strokeWidth={10}
                      />
                    </label>
                  );
                })}
              </div>
              <p>Your rating is {rating ? rating : 0}</p>
              <textarea
                cols="30"
                rows="10"
                minLength={"0"}
                maxLength={"100"}
                placeholder="We value your input, please share your experience..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <button>Submit Your Experience</button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    <SkeletonLoader width="80%" length={15} />
  );
};

export default Product;
