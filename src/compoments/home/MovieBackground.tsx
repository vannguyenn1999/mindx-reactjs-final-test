import { useContext, useMemo, useState } from "react";
import { ListDataContext } from "../../core/ListContext";
import { getRandomElements } from "../../helpers/tools";
import { DATA_CATAGORY, type MovieDataType } from "../../helpers/typeData";
import clsx from "clsx";
import { FaHeart, FaInfo, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieBackground = () => {
  const { DATA_MOVIE } = useContext(ListDataContext);

  const randomMovie = useMemo(
    () => getRandomElements(DATA_MOVIE, 5),
    [DATA_MOVIE],
  );

  const [movie, setMovie] = useState<MovieDataType>(randomMovie[0]);

  return (
    <div className={`relative w-full max-h-125 lg:max-h-160 overflow-hidden`}>
      <img
        src={movie.image_thumb}
        alt=""
        className="w-full h-70 lg:h-full! object-center mask-l-from-5% mask-l-to-95% transform-transition duration-100"
      />

      <div className="absolute bottom-15 left-5 md:bottom-25 lg:top-55 lg:left-15 w-70 lg:w-100 flex flex-col gap-1 lg:gap-4 flex-wrap transform-transition duration-100">
        <h2 className="text-xl lg:text-4xl text-gray-50 font-bold hover:text-amber-300 cursor-default">
          {movie.title}
        </h2>
        <div className="md:flex items-center flex-wrap">
          {DATA_CATAGORY.filter((item) =>
            movie.categories.includes(item.slug),
          ).map((item) => (
            <span
              key={item.id}
              className="text-[9px] lg:text-sm text-gray-300 me-0.5 md:me-1 lg:me-2 border border-gray-300 px-1 md:px-1.5 lg:px-2 py-0.5 rounded-xl"
            >
              {item.name}
            </span>
          ))}
        </div>

        <p className="hidden lg:block text-gray-50 ">
          {String(movie.info).length > 300
            ? `${String(movie.info).slice(0, 300)}...`
            : movie.info}
        </p>
      </div>

      <div className="hidden md:flex items-center absolute md:bottom-5 md:left-5 lg:bottom-20 lg:left-15 gap-5">
        <Link
          to={`/xem-phim/${movie.slug}`}
          className=" p-3 lg:p-6 rounded-full bg-amber-300 hover:bg-amber-400 transition-colors duration-300 hover:shadow-xl shadow-amber-500/50"
        >
          <FaPlay className="text-xl lg:text-2xl cursor-pointer" />
        </Link>

        <div className="flex items-center border border-gray-50 rounded-2xl p-1.5 lg:p-3 gap-4 justify-around">
          <FaHeart className="text-sm lg:text-xl text-gray-100 cursor-pointer ms-3" />
          <div className="border border-amber-50 mx-2 my-0 h-5"></div>
          <Link to={`/phim/${movie.slug}`} className="cursor-pointer me-3 ">
            <FaInfo className="text-sm lg:text-xl text-gray-100 hover:text-amber-300" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-1 right-30 md:right-5 md:bottom-5 lg:bottom-20! lg:right-15!">
        {randomMovie.map((item: MovieDataType) => (
          <button
            key={item._id}
            onClick={() => setMovie(item)}
            className="mx-1"
          >
            <img
              src={item.image}
              alt=""
              className={clsx(
                "w-7 h-7 rounded-full md:w-10 md:h-7 md:rounded-md lg:w-17 lg:h-10 object-cover lg:rounded-lg transition-transform duration-300 cursor-pointer",
                item._id === movie._id
                  ? "scale-110 border-2 border-amber-300"
                  : "hover:scale-110",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieBackground;
