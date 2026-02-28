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
    <div className={`relative w-full max-h-250 lg:max-h-150 overflow-hidden`}>
      <img
        src={movie.image_thumb}
        alt=""
        className="w-full h-full object-cover mask-l-from-5% mask-l-to-95% transform-transition duration-100 bg-center"
      />

      <div className="absolute top-10 left-5 lg:top-20 lg:left-15 w-50  lg:w-100 flex flex-col gap-5 flex-wrap transform-transition duration-100">
        <h2 className="text-xl lg:text-4xl text-gray-50 font-bold hover:text-amber-300 cursor-default">
          {movie.title}
        </h2>
        <div className="flex items-center flex-wrap">
          {DATA_CATAGORY.filter((item) =>
            movie.categories.includes(item.slug),
          ).map((item) => (
            <span
              key={item.id}
              className="text-[11px] lg:text-sm text-gray-300 me-2 border border-gray-300 px-2 py-0.5 rounded-xl"
            >
              {item.name}
            </span>
          ))}
        </div>

        <p className="hidden md:block text-gray-50 ">
          {String(movie.info).length > 500
            ? `${String(movie.info).slice(0, 500)}...`
            : movie.info}
        </p>
      </div>

      <div className="hidden md:flex items-center absolute bottom-20 left-15 gap-5">
        <Link
          to={`/phim/${movie.slug}`}
          className="p-6 rounded-full bg-amber-300 hover:bg-amber-400 transition-colors duration-300 hover:shadow-xl shadow-amber-500/50"
        >
          <FaPlay className="text-2xl cursor-pointer" />
        </Link>

        <div className="flex items-center border border-gray-50 rounded-2xl p-3 gap-4 justify-around">
          <FaHeart className="text-xl text-gray-100 cursor-pointer ms-3" />
          <div className="border border-amber-50 mx-2 my-0 h-5"></div>
          <Link to={`/phim/${movie.slug}`} className="cursor-pointer me-3 ">
            <FaInfo className="text-xl text-gray-100 hover:text-amber-300" />
          </Link>
        </div>
      </div>

      <div className="absolute lg:bottom-20! lg:right-15!">
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
                "w-10 h-10 rounded-full lg:w-20 lg:h-15 object-cover lg:rounded-lg transition-transform duration-300 cursor-pointer",
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
