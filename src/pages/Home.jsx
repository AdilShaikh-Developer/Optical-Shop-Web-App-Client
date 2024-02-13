// Importing Modules
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Autoplay,
  EffectCoverflow,
  EffectFade,
  Pagination,
} from "swiper/modules";

// Importing Components
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import SkeletonLoader from "../components/SkeletonLoader";

// Importing Icons
import { CiShare1 } from "react-icons/ci";

// Importing Stylesheets
import "../styles/home.scss";

import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/effect-coverflow";
import "swiper/scss/effect-fade";
import "swiper/scss/pagination";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const { loading, featuredProducts } = useSelector((state) => state.product);

  useEffect(() => {
    if (featuredProducts) {
      featuredProducts.forEach((product) => {
        setPhotos((prev) => [...prev, product]);
      });
    }
  }, []);
  return (
    <div className="home">
      <div className="carousel-container">
        {loading ? (
          <SkeletonLoader width="100%" length="4" />
        ) : (
          <Carousel
            effect={"fade"}
            slidesPerView={1}
            modules={[Pagination, Autoplay, EffectFade]}
            coverflowEffect={false}
            autoplay={true}
            photos={photos}
          />
        )}
      </div>
      <div className="sliding-carousel-container">
        <h2>variety of products</h2>
        {loading ? (
          <SkeletonLoader width="80%" length="4" />
        ) : (
          <Carousel
            effect={"coverflow"}
            slidesPerView={3}
            modules={[EffectCoverflow]}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={false}
            photos={[
              "uploads/Full%20Rim.png",
              "uploads/Rim%20Less.png",
              "uploads/Semi%20Rim%20Less.png",
              "uploads/Plastic.jpg",
              "uploads/Acetate.jpg",
              "uploads/Metal.jpg",
              "uploads/Wood.jpg",
              "uploads/Titanium.jpg",
            ]}
            description={[
              "Full Rim",
              "Rim Less",
              "Semi Rim Less",
              "Plastic",
              "Acetate",
              "Metal",
              "Wood",
              "Titanium",
            ]}
          />
        )}
        <Link to={"/shop"}>
          explore more products <CiShare1 />
        </Link>
      </div>
      <div className="store-map-container">
        <h2>visit our store</h2>
        <div className="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.630419227115!2d75.32439994999999!3d19.8978219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb981bc8c90167%3A0x88efe7174f27aae5!2sArif%20Colony%2C%20Aurangabad%2C%20Maharashtra%20431004!5e0!3m2!1sen!2sin!4v1707648383720!5m2!1sen!2sin"></iframe>
        </div>
      </div>
    </div>
  );
};

export default Home;
