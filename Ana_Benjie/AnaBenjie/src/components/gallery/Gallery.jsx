import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { fotosCarrossel } from "../../assets/assets";

const Gallery = () => {
  return (
    <div className="w-full max-w-4xl my-8">
      <Swiper
        effect="coverflow"
        autoplay={{
          delay: 1700,
          disableOnInteraction: false,
        }}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        coverflowEffect={{
          rotate: 50, // menos girado
          stretch: 0, // valor grande aproxima horizontalmente
          depth: 100, // ajuste para ver qual fica melhor
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        {[...fotosCarrossel]
          .sort(() => Math.random() - 0.7)
          .map((foto, index) => (
            <SwiperSlide key={index} className="w-[300px]">
              <img
                src={foto.img}
                alt="Ana e Benjie"
                className="w-full h-[45vh] md:h-auto rounded-xl"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
