// Importing Modules
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing Components
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";
import PageNotFound from "./PageNotFound";

// Importing Icons
import { CgProfile } from "react-icons/cg";
import { CiShare1 } from "react-icons/ci";

// Importing Reduct Actions
import { fetchLikedProducts } from "../app/actions/user";

// Importing Stylesheets
import "../styles/profile.scss";

const Profile = () => {
  const { loading, user, likedProducts } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) fetchLikedProducts(dispatch, user._id);
  }, []);
  return loading ? (
    <SkeletonLoader width="100%" length={12} />
  ) : user ? (
    <div className="profile-page">
      <div className="profile">
        {user.photo ? <img src={user.photo} /> : <CgProfile />}
        <h3>{user.name}</h3>
        <span>{user.email}</span>
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
  ) : (
    <PageNotFound />
  );
};

export default Profile;
