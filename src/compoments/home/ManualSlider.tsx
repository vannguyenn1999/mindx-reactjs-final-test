import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useContext, useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { ListDataContext } from "../../core/ListContext";
import { Link } from "react-router-dom";
import { getRandomElements } from "../../helpers/tools";
import { DATA_CATAGORY, type MovieDataType } from "../../helpers/typeData";

const ManualSlider = () => {
  const { DATA_MOVIE } = useContext(ListDataContext);
  const movieTop10 = useMemo(
    () => getRandomElements(DATA_MOVIE, 10),
    [DATA_MOVIE],
  );
  return (
    <div className="group relative w-full px-5 lg:pt-5 lg:px-15 pb-5">
      <h2 className="text-xl text-white font-bold mb-3">Top 10 phim hôm nay</h2>
      <button className="prev-btn hidden md:block absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/20 p-2 rounded-full hover:bg-white/50 cursor-pointer">
        <FaArrowLeft />
      </button>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={5}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
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
            slidesPerView: 5,
            spaceBetween: 10,
          },
          // Khi chiều rộng màn hình >= 1280px (Màn hình lớn)
          1280: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        // Kích hoạt dấu chấm phân trang
        // pagination={{ clickable: true }}

        className="mySwiper"
      >
        {movieTop10.map((movie: MovieDataType, index: number) => (
          <SwiperSlide key={movie._id}>
            <Link
              to={`/phim/${movie.slug}`}
              className="rounded-2xl flex flex-col h-65 lg:h-95 items-center justify-center text-white cursor-pointer"
            >
              {/* h-65 lg:h-95 */}
              <div
                className="flex flex-col justify-center items-start perspective-[1000px]  "
                key={movie._id}
              >
                <div
                  className="relative h-full transition-transform duration-2000 ease-out 
                  hover:transform-[rotateY(180deg)] transform-3d"
                >
                  <img
                    className="block rounded-2xl object-cover w-100 h-50 xl:h-76 bg-gray-600 
                 shadow-xl backface-hidden"
                    src={movie.image || ""}
                    alt={movie.title}
                    loading="lazy"
                  />

                  <div
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 
                    transform-[rotateY(180deg)] backface-hidden 
                    flex items-center justify-center text-white p-2 text-center border border-amber-300"
                  >
                    <p className="text-xs">{movie.info?.slice(0, 700)}</p>
                  </div>
                </div>
                <div className="flex items-center mt-2 justify-start!">
                  <span className="text-5xl text-amber-300 shadow-2xl me-1">
                    {index + 1}
                  </span>
                  <div className="flex flex-col justify-start items-start">
                    <span className=" w-auto text-center text-white font-bold text-[10px] lg:text-[13px]">
                      {movie.title}
                    </span>
                    <div className="md:flex items-center flex-wrap">
                      {DATA_CATAGORY.filter((item) =>
                        movie.categories.includes(item.slug),
                      ).map((item) => (
                        <span
                          key={item.id}
                          className="text-[9px] lg:text-xs text-gray-300 me-0.5 md:me-1 lg:me-2 rounded-xl"
                        >
                          {item.name} .
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="next-btn hidden md:block absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/20 p-2 rounded-full hover:bg-white/50 cursor-pointer">
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ManualSlider;
