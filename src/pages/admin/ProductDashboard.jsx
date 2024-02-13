// Importing Modules
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

// Importing Components
import { Link } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import TableHOC from "../../components/admin/TableHOC";

// Importing Icons
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { IoPricetags, IoPricetagsOutline } from "react-icons/io5";

// Importing Actions
import { fetchDashboardProducts } from "../../app/actions/admin-dashboard";
import { fetchFeaturedProducts } from "../../app/actions/product";

// Importing Stylesheets
import "../../styles/admin/admin.scss";
import "../../styles/admin/products.scss";
import SkeletonLoader from "../../components/SkeletonLoader";

const columns = [
  {
    Header: "Photo",
    accessor: "photos",
  },

  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Stock",
    accessor: "availability",
  },
  {
    Header: "Rating",
    accessor: "rating",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const featuredProductTableColumns = [
  {
    Header: "Product ID",
    accessor: "_id",
  },
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const ProductDashboard = () => {
  const [productsRows, setProductsRows] = useState([]);
  const [featuredProductsRows, setFeaturedProductsRows] = useState([]);

  const { loading, dashboardProducts } = useSelector((state) => state.admin);
  const { featuredProducts } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const handleRemoveFeaturedProduct = async (e) => {
    const confirmation = confirm(
      "Are you sure you want to remove this product from featured product?"
    );
    try {
      if (confirmation) {
        const res = await axios.delete(
          `${import.meta.env.VITE_SERVER}/api/v1/featured-products/${
            e.target.attributes.value.value
          }`
        );
        toast.success("Product remove from featured-products successfully!");
        fetchDashboardProducts(dispatch);
        fetchFeaturedProducts(dispatch);
      } else toast.success("Removing product featured canceled.");
    } catch (error) {
      toast.error("error");
    }
  };

  const handleCreateFeaturedProduct = async (e) => {
    const confirmation = confirm(
      "Are you sure you want to make this product a featured product?"
    );
    try {
      if (confirmation) {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER}/api/v1/featured-products/${
            e.target.attributes.value.value
          }`
        );
        toast.success(res.data.message);
        fetchDashboardProducts(dispatch);
        fetchFeaturedProducts(dispatch);
      } else toast.success("Making product featured canceled.");
    } catch (error) {
      toast.error("error");
    }
  };
  const handleProductAvailaibility = async (e) => {
    const confirmation = confirm(
      "Are you sure you want to change the availability of this product?"
    );
    try {
      if (confirmation) {
        const res = await axios.put(
          `${import.meta.env.VITE_SERVER}/api/v1/products/${
            e.target.attributes.value.value
          }/availability`
        );
        toast.success(res.data.response);
        fetchDashboardProducts(dispatch);
      } else toast.success("Availability change canceled.");
    } catch (error) {
      toast.error("error");
    }
  };

  const handleDeleteButton = async (e) => {
    const confirmation = confirm(
      "Are you sure you want to delete this product?"
    );
    try {
      if (confirmation) {
        const res = await axios.delete(
          `${import.meta.env.VITE_SERVER}/api/v1/products/${
            e.target.attributes.value.value
          }`
        );
        toast.success(res.data.message);
        fetchDashboardProducts(dispatch);
      } else toast.success("Product deletion canceled.");
    } catch (error) {
      toast.error("error");
    }
  };

  useEffect(() => {
    if (dashboardProducts)
      setProductsRows(
        dashboardProducts.map((i) => ({
          photos: <img src={`${import.meta.env.VITE_SERVER}/${i.photos[0]}`} />,
          name: i.name,
          category: i.category,

          availability: featuredProducts.filter((e) => e._id === i._id)
            .length ? (
            <div
              className={i.availability ? "green" : "red"}
              onClick={() =>
                toast.error(
                  "Cannot edit a featured product. Remove it from featured products first."
                )
              }
            />
          ) : (
            <div
              className={i.availability ? "green" : "red"}
              value={i._id}
              onClick={handleProductAvailaibility}
            />
          ),

          rating:
            i.rating.length > 0
              ? i.rating.length === 1
                ? i.rating[0].rating
                : i.rating.reduce(
                    (acc, curr) => (acc.rating + curr.rating) / i.rating.length
                  )
              : 0,
          action: (
            <div className="action-button-container">
              {featuredProducts.filter((e) => e._id === i._id).length ? (
                <Link
                  className="feature-product-button"
                  onClick={handleRemoveFeaturedProduct}
                  value={i._id}
                >
                  <IoPricetags />
                  Remove from Featured
                </Link>
              ) : (
                <>
                  <Link to={`/admin/products-dashboard/${i._id}`}>
                    <AiOutlineEdit />
                    Edit
                  </Link>
                  <Link
                    onClick={handleDeleteButton}
                    className="delete-button"
                    value={i._id}
                  >
                    <AiOutlineDelete />
                    Delete
                  </Link>
                  <Link
                    className="feature-product-button"
                    onClick={
                      i.availability
                        ? handleCreateFeaturedProduct
                        : () =>
                            toast.error(
                              "Cannot make a unavailable product, featured product."
                            )
                    }
                    value={i._id}
                  >
                    <IoPricetagsOutline />
                    Feature Product
                  </Link>
                </>
              )}
            </div>
          ),
        }))
      );
    setFeaturedProductsRows(
      featuredProducts.map((i) => ({
        _id: i._id,
        photo: <img src={`${import.meta.env.VITE_SERVER}/${i.photo}`} />,
        action: (
          <div className="action-button-container">
            <Link
              value={i._id}
              onClick={handleRemoveFeaturedProduct}
              className="delete-button"
            >
              <IoPricetags />
              Remove From Featured
            </Link>
          </div>
        ),
      }))
    );
  }, [dashboardProducts, featuredProducts]);

  const Table = TableHOC(
    columns,
    productsRows,
    "dashboard-product-box",
    10,
    productsRows.length > 10
  )();
  const FeaturedProductTable = TableHOC(
    featuredProductTableColumns,
    featuredProductsRows,
    "dashboard-product-box",
    5,
    featuredProductsRows.length > 5
  )();

  return (
    <div className="admin-dashboard-page">
      <Navbar />
      {loading ? (
        <SkeletonLoader width="80%" length={15} />
      ) : (
        <>
          <div className="product-dashboard-container">
            <h2 className="heading">Product Management</h2>
            <main className="products-table-container">{Table}</main>
          </div>
          <div className="featured-product-dashboard-container">
            <h2 className="heading">Featured Product Management</h2>
            <main className="products-table-container">
              {FeaturedProductTable}
            </main>
          </div>
          <Link
            to={"/admin/products-dashboard/create"}
            className="create-product-button"
          >
            <AiOutlinePlus />
          </Link>
        </>
      )}
    </div>
  );
};

export default ProductDashboard;
