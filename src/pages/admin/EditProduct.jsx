// Importing Modules
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// Importing Components
import Carousel from "../../components/Carousel";
import SkeletonLoader from "../../components/SkeletonLoader";
import Navbar from "../../components/admin/Navbar";
import PageNotFound from "../../pages/PageNotFound";

// Importing Icons
import { AiOutlineDelete } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";

// Importing Actions
import {
  fetchDashboardProduct,
  fetchDashboardProducts,
} from "../../app/actions/admin-dashboard";

// Importing Stylesheets
import "../../styles/admin/admin.scss";
import "../../styles/admin/products.scss";

const EditProduct = () => {
  const { loading, product } = useSelector((state) => state.admin);
  const [photos, setPhotos] = useState([]);
  const [photosPrev, setPhotosPrev] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [shape, setShape] = useState("");
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");

  const handleImageChange = (e) => {
    setPhotos(e.target.files);
    setPhotosPrev([]);

    for (let index = 0; index < e.target.files.length; index++) {
      setPhotosPrev((prev) => [
        ...prev,
        URL.createObjectURL(e.target.files[index]),
      ]);
    }
  };

  const navigate = useNavigate();

  const handleDeleteButton = async (e) => {
    const confirmation = confirm(
      "Are you sure you want to delete this product?"
    );
    try {
      if (confirmation) {
        const res = await axios.delete(
          `${import.meta.env.VITE_SERVER}/api/v1/products/${product._id}`
        );
        toast.success(res.data.message);
        navigate("/admin/products-dashboard");
      } else toast.success("Product deletion canceled.");
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let index = 0; index < photos.length; index++) {
      formData.append("photos", photos[index]);
    }
    formData.set("name", name);
    formData.set("category", category);
    formData.set("size", size);
    formData.set("shape", shape);
    formData.set("colour", colour);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/products/${product._id}`,
        formData
      );
      toast.success(res.data.message);
      fetchDashboardProducts(dispatch);
      navigate("/admin/products-dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchDashboardProduct(dispatch, window.location.href.slice(-24));
  }, []);

  return (
    <div className="admin-dashboard-page">
      <Navbar />
      <main className="edit-product-container">
        {loading ? (
          <SkeletonLoader length={15} />
        ) : product ? (
          <>
            <section>
              <strong>ID - {product._id}</strong>
              <Carousel
                photos={product.photos}
                effect={"coverflow"}
                slidesPerView={1}
                modules={[Pagination, Autoplay, EffectCoverflow]}
                coverflowEffect={false}
                autoplay={true}
              />
              <p>{product.name}</p>
              {product.availability ? (
                <span style={{ color: "rgb(0, 195, 0)" }}>Available</span>
              ) : (
                <span style={{ color: "red" }}>Unavailable</span>
              )}
              <div className="product-details">
                <p>Likes : {product.likedBy.length}</p>
                <p>Added to Cart : {product.cartedBy.length}</p>
              </div>
              <button
                className="product-delete-button"
                onClick={handleDeleteButton}
              >
                <AiOutlineDelete />
              </button>
            </section>
            <article>
              <div className="create-product-container">
                <form onSubmit={handleSubmit}>
                  <h2>Manage</h2>
                  <label htmlFor="file-input">
                    <section>
                      {photosPrev.length != 0 ? (
                        <Carousel
                          photos={photosPrev}
                          effect={"coverflow"}
                          slidesPerView={1}
                          modules={[Pagination, Autoplay, EffectCoverflow]}
                          coverflowEffect={false}
                          autoplay={true}
                          isProductDashboard={true}
                        />
                      ) : (
                        <FcAddImage />
                      )}
                    </section>
                    <input
                      type="file"
                      id="file-input"
                      name="photos"
                      multiple
                      onChange={handleImageChange}
                    />
                  </label>

                  <label htmlFor="name">
                    Product Name
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={product.name}
                    />
                  </label>
                  <label htmlFor="category">
                    Category
                    <input
                      type="text"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder={product.category}
                    />
                  </label>
                  <label htmlFor="size">
                    Frame Size
                    <input
                      type="text"
                      id="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder={product.size}
                    />
                  </label>
                  <label htmlFor="shape">
                    Frame Shape
                    <input
                      type="text"
                      id="shape"
                      value={shape}
                      onChange={(e) => setShape(e.target.value)}
                      placeholder={product.shape}
                    />
                  </label>
                  <label htmlFor="color">
                    Frame Colour
                    <input
                      type="text"
                      id="color"
                      value={colour}
                      onChange={(e) => setColour(e.target.value)}
                      placeholder={product.colour}
                    />
                  </label>
                  <button>Edit</button>
                </form>
              </div>
            </article>
          </>
        ) : (
          <PageNotFound />
        )}
      </main>
    </div>
  );
};

export default EditProduct;
