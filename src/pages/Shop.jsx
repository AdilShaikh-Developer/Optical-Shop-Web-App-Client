// Importing Modules
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing Action Functions
import { fetchCategories, fetchProducts } from "../app/actions/product";

// Importing Components
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";

// Importing Icons
import { IoSearchOutline } from "react-icons/io5";

// Importing Stylesheets
import "../styles/shop.scss";

const Shop = () => {
  const { loading, products, categories } = useSelector(
    (state) => state.product
  );
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts(dispatch);
    fetchCategories(dispatch);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="shop-page">
      <div className="search-bar-wrapper">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearchOutline />
        </div>
      </div>
      <div className="product-cards-container">
        {!products ? (
          <SkeletonLoader width="90%" length={12} />
        ) : (
          products
            .filter((product) => {
              return (
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase()) ||
                product.size.toLowerCase().includes(search.toLowerCase()) ||
                product.shape.toLowerCase().includes(search.toLowerCase()) ||
                product.colour.toLowerCase().includes(search.toLowerCase())
              );
            })
            .filter((product) => {
              return product.category.includes(filter);
            })
            .sort((a, b) => {
              const ratingOfA =
                a.rating.length == 0
                  ? 0
                  : a.rating.length == 1
                  ? a.rating[0].rating
                  : a.rating.reduce((acc, cur) => {
                      return (acc.rating + cur.rating) / a.rating.length;
                    }) / 5;
              const ratingOfB =
                b.rating.length == 0
                  ? 0
                  : b.rating.length == 1
                  ? b.rating[0].rating
                  : b.rating.reduce((acc, cur) => {
                      return (acc.rating + cur.rating) / b.rating.length;
                    }) / 5;
              const dateOfA = new Date(a.createdAt).getTime();
              const dateOfB = new Date(b.createdAt).getTime();
              if (sort === "mostRated") {
                return ratingOfB - ratingOfA;
              }
              if (sort === "leastRated") {
                return ratingOfA - ratingOfB;
              }
              if (sort === "latest") {
                return dateOfB - dateOfA;
              }
              if (sort === "oldest") {
                return dateOfA - dateOfB;
              }
            })
            .map((product) => (
              <ProductCard product={product} key={product._id} />
            ))
        )}
      </div>
      <div className="filter-container">
        <select name="" id="" onChange={(e) => setSort(e.target.value)}>
          <option value="">sort</option>
          <option value="latest">latest</option>
          <option value="oldest">oldest</option>
          <option value="mostRated">most rated</option>
          <option value="leastRated">least rated</option>
        </select>
        {!categories ? (
          <SkeletonLoader width="100" length={2} />
        ) : (
          <select name="" id="" onChange={(e) => setFilter(e.target.value)}>
            <option value="">filter</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Shop;
