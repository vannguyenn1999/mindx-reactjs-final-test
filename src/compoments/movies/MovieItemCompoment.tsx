import { memo, useMemo, type FC } from "react";
import { FaPlay, FaHeart, FaInfoCircle } from "react-icons/fa";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

// import type { CategoryItem } from "@/helpers/models";
import { type MovieDataType, DATA_CATAGORY } from "../../helpers/typeData";

const MovieItemCompoment: FC<MovieDataType> = ({
  _id,
  duration,
  image,
  image_thumb,
  imdb,
  release_date,
  title,
  slug,
  categories,
}) => {
  const renderCategories = useMemo(() => {
    return DATA_CATAGORY.filter((item) => categories.includes(item.slug));
  }, [categories]);
  // console.log(image);
  return (
    <div
      className="cursor-pointer group relative w-auto inline-block"
      key={_id}
    >
      <div className="flex justify-center items-center">
        <img
          className="block rounded-2xl object-cover w-62 h-50 xl:h-76 bg-gray-600"
          src={image ? image : ""}
          alt=""
          srcSet=""
          loading="lazy"
        />
      </div>
      <span className="flex justify-center items-center mt-2 w-auto text-center text-white font-bold text-sm">
        {title}
      </span>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-100 bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-49 duration-200">
        <div className="flex flex-col w-100 h-full pb-3">
          <div
            className="bg-cover bg-center rounded-t-2xl h-52"
            style={{
              backgroundImage: `url(${image_thumb ? image_thumb : ""})`,
            }}
          ></div>
          <div className="mt-3 px-3">
            <span className="text-white">{title}</span>
            <div className="flex items-center justify-center my-2">
              <Link to={`/xem-phim/${slug}`}>
                <Button color="yellow" outline className="cursor-pointer px-6">
                  <FaPlay />
                  <span className="ms-2">Xem ngay</span>
                </Button>
              </Link>

              <Button color="red" outline className=" cursor-pointer mx-3">
                <FaHeart />
                <span className="ms-2">Thích</span>
              </Button>

              <Link to={`/phim/${slug}`}>
                <Button color="purple" outline className="cursor-pointer">
                  <FaInfoCircle />
                  <span className="ms-2">Chi tiết</span>
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-start my-3">
              <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 outline outline-amber-300  mx-1">
                {imdb}
              </span>

              <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 mx-1">
                {release_date}
              </span>

              <span className="text-white text-sm bg-gray-700 rounded-xl px-5 py-1 mx-1">
                {duration}
              </span>
            </div>
            <div className="flex items-center justify-start my-2">
              {Array.isArray(renderCategories) &&
                renderCategories.length > 0 &&
                renderCategories.map((category) => {
                  return (
                    <span
                      key={category.id}
                      className="text-white text-sm bg-gray-700 rounded-full px-2 py-1 mx-1"
                    >
                      {category.name || ""}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      ``
    </div>
  );
};

export default memo(MovieItemCompoment);

// https://flowbite-react.com/docs/components/popover#controlled
