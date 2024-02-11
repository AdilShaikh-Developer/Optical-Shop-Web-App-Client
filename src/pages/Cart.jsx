import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

import "../styles/cart.scss";
import { useEffect } from "react";
import { fetchCartItems } from "../app/actions/user";
import { CiShare1 } from "react-icons/ci";

const Cart = () => {
  const { loading, cartItems, user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchCartItems(dispatch, user._id);
  }, []);

  return (
    <div className="cart-items-page">
      <h3>
        <CiShare1 /> CART ITEMS
      </h3>
      <div className="product-cards-container">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) =>
            products
              .filter((product) => {
                return product._id === cartItem;
              })
              .map((product) => (
                <ProductCard product={product} key={product._id} />
              ))
          )
        ) : (
          <div className="not-product-cart-message-container">
            <span>No Cart Items Available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
