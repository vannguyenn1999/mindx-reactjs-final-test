import { useContext, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ListDataContext } from "../../core/ListContext";
import { Rating, RatingStar, TabItem, Tabs } from "flowbite-react";
import {
  FaCommentDots,
  FaHeart,
  FaPlay,
  FaShare,
  FaUserTie,
} from "react-icons/fa";
import { type ActorDataType } from "../../helpers/typeData";
import ActorItemCompoment from "../actor/ActorItemCompoment";
import { HiClipboardList } from "react-icons/hi";

const MovieDetailCompoment = () => {
  const { slug } = useParams();
  const { DATA_MOVIE } = useContext(ListDataContext);

  const movie = useMemo(() => {
    return DATA_MOVIE.find((item) => item.slug === slug);
  }, [DATA_MOVIE, slug]);

  useEffect(() => {
    if (movie) {
      document.title = `Phim : ${movie.title}`;
    }

    return () => {
      document.title = "Web Movie";
    };
  }, [slug, movie]);

  return (
    <div className="relative min-h-400 lg:min-h-550">
      <img
        src={movie?.image_thumb}
        alt=""
        className="opacity-75 object-cover w-full rounded-b-2xl absolute -top-20 hidden lg:block"
      />

      <div className="lg:px-5 xl:px-20 absolute lg:top-100 left-0 w-full">
        <div
          className={`flex flex-col lg:grid lg:grid-cols-4 bg-[#2a374a] h-auto rounded-xl p-5`}
        >
          <div className="lg:pe-4 lg:border-r border-gray-500">
            <img
              src={movie?.image}
              alt={movie?.title}
              className="object-contain w-60 rounded-xl bg-gray-400 mx-auto"
              loading="lazy"
            />
            <div className="my-3 text-center">
              <span className="text-white font-bold text-xl">
                {movie?.title}
              </span>
            </div>

            <div className="flex items-center mt-10 justify-center lg:justify-center flex-wrap">
              <div className="outline outline-amber-300 px-2 xl:px-5 py-0.5 text-white rounded-xl">
                <span className="text-sm me-1 text-amber-300">IMDb</span>
                {movie?.imdb}
              </div>

              <div className="mx-2 outline outline-gray-100 px-2 py-0.5 text-white rounded-lg bg-gray-700">
                {movie?.release_date}
              </div>

              <div className="outline outline-gray-100 px-2 py-0.5 text-white rounded-lg bg-gray-700">
                {movie?.duration}
              </div>
            </div>

            <div className="flex items-center justify-start my-3">
              {/* {movie?.categories.map((category) => (
              <span
                key={category._id}
                className="text-white text-[10px] xl:text-[12px] bg-gray-700 rounded-full px-2 py-1 me-2"
              >
                {category.name}
              </span>
            ))} */}
            </div>

            <div>
              <span className="text-white">Giới Thiệu :</span>
              <p className="text-gray-400 text-sm mt-1.5">{movie?.info}</p>
            </div>

            <p className="text-white mt-3">
              Thời lượng :{" "}
              <span className="text-gray-400 text-sm ms-2">
                {movie?.duration}
              </span>
            </p>
            <p className="text-white mt-3">
              Quốc gia :{" "}
              {/* <span className="text-gray-400 text-sm ms-2">
              {movie?.country?.name || "Đang cập nhật"}
            </span> */}
            </p>

            <div className="hidden lg:block">
              <h2 className="text-white font-bold mt-10 text-xl">Diễn viên</h2>
              <div className="xl:px-2 grid grid-cols-3 gap-4 pt-5">
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
          <div className="lg:col-span-3 lg:p-2">
            <div className="flex flex-col lg:flex-row lg:items-center w-full lg:justify-between">
              <div className="w-auto my-3 mt-10 lg:my-0 lg:mt-0">
                <Link to={`/xem-phim/${slug}`}>
                  <button className="lg:ms-15 mx-auto px-2 py-3 lg:px-6 rounded-xl bg-amber-300 cursor-pointer hover:shadow-xl/30 hover:shadow-amber-500/50 hover:bg-amber-400 transition-all duration-300 flex items-center justify-center w-80 md:w-95 lg:w-auto">
                    <FaPlay />
                    <span className="ms-2 text-gray-800 font-semibold text-[14px]">
                      Xem ngay
                    </span>
                  </button>
                </Link>
              </div>
              <div className="flex justify-between md:justify-evenly items-center">
                <div className="text-white rounded-xl hover:bg-gray-700 py-2 px-3 cursor-pointer flex flex- lg:flex-row items-center justify-center">
                  <FaHeart />
                  <span className="lg:ms-1 text-sm font-semibold">
                    Yêu thích
                  </span>
                </div>

                <div className="text-white rounded-xl hover:bg-gray-700 py-2 px-3 cursor-pointer flex flex-col lg:flex-row items-center justify-center">
                  <FaCommentDots />
                  <span className="lg:ms-1 text-sm font-semibold">
                    {" "}
                    Bình luận{" "}
                  </span>
                </div>

                <div className="text-white rounded-xl hover:bg-gray-700 py-2 px-3 cursor-pointer flex flex-col lg:flex-row items-center justify-center">
                  <FaShare />
                  <span className="lg:ms-1 text-sm font-semibold">
                    {" "}
                    Chia sẻ{" "}
                  </span>
                </div>

                <Rating>
                  <div className="flex items-center justify-center px-3 py-2 md:px-4 lg:py-3 lg:px-4 bg-blue-400 rounded-xl lg:ms-4">
                    <span className=" text-white lg:me-2 text-sm lg:text-md">
                      {" "}
                      {5}{" "}
                    </span>
                    <RatingStar />
                  </div>
                </Rating>
              </div>
            </div>

            <div className="mt-3 lg:p-2">
              <Tabs aria-label="Tabs with icons" variant="underline">
                <TabItem title="Diễn viên" icon={FaUserTie}>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                    {(Array.isArray(movie?.actors) ? movie.actors : []).map(
                      (item: ActorDataType) => (
                        <Link to={`/dien-vien/${item.slug}`} key={item._id}>
                          <ActorItemCompoment
                            name={item.name}
                            image={item.image}
                          />
                        </Link>
                      ),
                    )}
                  </div>
                </TabItem>
                <TabItem title="Đề xuất" icon={HiClipboardList}>
                  <></>
                </TabItem>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailCompoment;
