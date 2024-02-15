// Importing Modules

// Importing Components
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Importing Styles
import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/effect-coverflow";
import "swiper/scss/effect-fade";
import "swiper/scss/pagination";

function Carousel({
  effect,
  slidesPerView,
  modules,
  coverflowEffect,
  autoplay,
  photos,
  description,
  isProductDashboard,
}) {
  return (
    <Swiper
      className="carousel"
      effect={effect}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={slidesPerView}
      coverflowEffect={coverflowEffect}
      pagination={true}
      autoplay={autoplay}
      modules={modules}
    >
      {photos.map((photo, index) => (
        <SwiperSlide key={index}>
          {isProductDashboard ? (
            <img src={photo} alt="" />
          ) : photo.photo ? (
            <Link to={`/shop/${photo._id}`}>
              <img src={`${import.meta.env.VITE_SERVER}/${photo.photo}`} />
            </Link>
          ) : (
            <>
              <img src={`${import.meta.env.VITE_SERVER}/${photo}`} />
              {description ? (
                <div className="description">{description[index]}</div>
              ) : (
                ""
              )}
            </>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
