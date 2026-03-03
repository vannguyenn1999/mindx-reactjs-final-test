import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ListDataContext } from "../../core/ListContext";
import { FaFlag, FaHeart, FaShare } from "react-icons/fa";

import { getYouTubeID } from "../../helpers/tools";
import type { ActorDataType } from "../../helpers/typeData";
import clsx from "clsx";

const MovieCompoment = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { DATA_MOVIE } = useContext(ListDataContext);
  const movie = useMemo(() => {
    return DATA_MOVIE.find((item) => item.slug === slug);
  }, [DATA_MOVIE, slug]);

  const [cinemaMode, setCinemaMode] = useState(false);
  useEffect(() => {
    if (movie) {
      document.title = `Phim : ${movie.title}`;
    } else {
      navigate("/home");
    }
    return () => {
      document.title = "Web Movie";
    };
  }, [slug, movie, navigate]);

  return (
    <>
      <div className="bg-[#1f2029] mx-auto min-h-280 relative lg:px-15 lg:py-10">
        {cinemaMode && <div className="fixed inset-0 bg-black z-45" />}

        <div
          className={clsx(
            "mb-25 rounded-xl relative shadow-lg h-70 md:h-150 lg:h-180",
            {
              "z-31!": cinemaMode === false,
              "z-50!": cinemaMode === true,
            },
          )}
        >
          <iframe
            className="md:rounded-t-xl w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${movie ? getYouTubeID(String(movie?.link)) : ""}`}
            title={movie?.title}
            loading="lazy"
            allow="autoplay"
          ></iframe>
          <div className="min-h-12.5 bg-[#08080a]">
            <div className="flex justify-between items-center px-5 py-3 rounded-b-xl">
              <div className="flex items-center lg:px-5">
                <div className="flex items-center text-white cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-800">
                  <FaHeart />
                  <span className="hidden md:block ms-2">Yêu thích</span>
                </div>
                <div className="flex items-center text-white cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-800">
                  <FaShare />
                  <span className="hidden md:block ms-2">Chia sẻ</span>
                </div>
                <div
                  onClick={() => setCinemaMode(!cinemaMode)}
                  className="flex items-center text-white cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-800"
                >
                  <div className="ms-2 flex items-center ">
                    <span className="hidden md:block">Rạp phim</span>
                    <span className="text-[10px] text-amber-500 ms-2 border border-amber-500 p-0.5 rounded-xl px-2">
                      {cinemaMode ? "ON" : "OFF"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center cursor-pointer">
                <FaFlag className="text-white" />
                <span className="hidden md:block text-white ms-2">Báo lỗi</span>
              </div>
            </div>
          </div>
          {/* Nút đóng khi ở cinema mode */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5">
          <div className="col-span-2 px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="">
                <div className="flex p-3 bg-gray-700 w-auto rounded-xl me-5">
                  <img
                    src={movie?.image}
                    alt=""
                    srcSet=""
                    className="object-cover w-24 h-24 rounded-2xl"
                    loading="lazy"
                  />
                  <div className="ms-3 my-auto">
                    <h5 className="text-center text-gray-300 font-semibold">
                      {movie?.title}
                    </h5>
                    <div className="flex items-center justify-start my-3">
                      <span className="text-white text-sm mx-1">
                        {movie?.release_date} &#9702;
                      </span>

                      <span className="text-white text-sm mx-1">
                        {movie?.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-auto">
                <p className="text-gray-400 text-sm mb-4">
                  {movie?.info?.slice(0, 300)}...
                </p>
                <Link to="/home" className="pointer-events-none">
                  <span className="text-amber-300">Thông tin phim</span>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-white font-bold text-xl px-3">Diễn viên</h2>
            <div className="px-5 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-4 gap-4 py-5">
              {movie?.actors.map((item: ActorDataType) => (
                <Link to={`/dien-vien/${item.slug}`} key={item._id}>
                  <div className="flex justify-center items-centers">
                    <img
                      className="w-20 h-20 rounded-full object-cover "
                      src={`/actors/${item.image}`}
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>
                  <span className="flex justify-center items-centers mt-2 text-white text-sm text-center">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCompoment;
