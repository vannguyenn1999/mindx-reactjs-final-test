import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { type FC } from "react";
import { Link } from "react-router-dom";

import type { MovieDataType } from "../../helpers/typeData";

type MovieScroll = {
  title: string;
  data: MovieDataType[];
  slidesPerView: number;
  time: number;
};

const MovieScroll: FC<MovieScroll> = ({ title, data, slidesPerView, time }) => {
  return (
    <div className="px-5 lg:pt-5 lg:px-15">
      <h2 className="text-xl text-white font-bold">{title}</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: time,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          // Khi chiều rộng màn hình >= 768px (Tablet)
          400: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          // Khi chiều rộng màn hình >= 768px (Tablet)
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          // Khi chiều rộng màn hình >= 1024px (Desktop)
          1024: {
            slidesPerView: slidesPerView,
            spaceBetween: 10,
          },
          // Khi chiều rộng màn hình >= 1280px (Màn hình lớn)
          1280: {
            slidesPerView: slidesPerView,
            spaceBetween: 10,
          },
        }}
        className="linear-wrapper"
      >
        {data.map((movie: MovieDataType) => (
          <SwiperSlide key={movie._id}>
            <Link
              to={`/phim/${movie.slug}`}
              className="rounded-2xl h-60 lg:h-95 flex flex-col items-center justify-center text-white cursor-pointer"
            >
              <div className="flex justify-center items-center">
                <img
                  className="block rounded-2xl object-cover w-100 h-50 xl:h-76 bg-gray-600"
                  src={movie.image ? movie.image : ""}
                  alt=""
                  srcSet=""
                  loading="lazy"
                />
              </div>
              <span className="flex justify-center items-center mt-2 w-auto text-center text-white font-bold text-[6px] lg:text-[13px]">
                {movie.title}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default MovieScroll;
