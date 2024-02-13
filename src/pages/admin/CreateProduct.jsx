// Importing Modules
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// Importing Components
import Navbar from "../../components/admin/Navbar";
import Carousel from "../../components/Carousel";

// Importing Icons
import { FcAddImage } from "react-icons/fc";

// Importing Actions
import { fetchDashboardProducts } from "../../app/actions/admin-dashboard";

// Importing Stylesheets
import "../../styles/admin/admin.scss";
import "../../styles/admin/products.scss";

const CreateProduct = () => {
  const [photos, setPhotos] = useState([]);
  const [photosPrev, setPhotosPrev] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [shape, setShape] = useState("");
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/products`,
        formData
      );
      fetchDashboardProducts(dispatch);
      toast.success(res.data.message);
      navigate("/admin/products-dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="admin-dashboard-page">
      <Navbar />
      <div className="create-product-container">
        <form onSubmit={handleSubmit}>
          <h2>Create Product</h2>
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
              required
              onChange={handleImageChange}
            />
          </label>

          <label htmlFor="name">
            Product Name
            <input
              type="text"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="category">
            Category
            <input
              type="text"
              id="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <label htmlFor="size">
            Frame Size
            <input
              type="text"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </label>
          <label htmlFor="shape">
            Frame Shape
            <input
              type="text"
              id="shape"
              value={shape}
              onChange={(e) => setShape(e.target.value)}
            />
          </label>
          <label htmlFor="color">
            Frame Colour
            <input
              type="text"
              id="color"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
            />
          </label>
          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
