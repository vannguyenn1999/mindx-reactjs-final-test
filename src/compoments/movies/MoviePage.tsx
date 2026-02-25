/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Navigate } from "react-router-dom";
import { useContext, useMemo, useState } from "react";

import {
  DATA_TOPIC,
  DATA_COUNTRY,
  DATA_CATAGORY,
  type MovieDataType,
} from "../../helpers/typeData";
import { findNameBySlug } from "../../helpers/tools";
import { ListDataContext } from "../../core/ListContext";
import MovieItemCompoment from "./MovieItemCompoment";
import { Pagination } from "flowbite-react";

const MoviePage = () => {
  const { type, slug } = useParams();
  const [page, setPage] = useState(1);
  const { DATA_MOVIE } = useContext(ListDataContext);

  const dataFilter = useMemo(() => {
    switch (type) {
      case "the-loai":
        return DATA_MOVIE?.filter((item: MovieDataType) =>
          item.categories?.some((category) => category === String(slug)),
        );

      case "chu-de":
        return DATA_MOVIE?.filter((item: MovieDataType) =>
          item.categories?.some((category) => category === String(slug)),
        );

      case "tim-kiem":
        return DATA_MOVIE?.filter((item: MovieDataType) =>
          item.slug?.toLowerCase().includes(String(slug).toLowerCase()),
        );

      case "quoc-gia":
        return DATA_MOVIE?.filter(
          (item: MovieDataType) => item.country === `${String(slug)}:`,
        );
      default:
        return DATA_MOVIE;
    }
  }, [type, slug]);

  const renderTitle = useMemo(() => {
    switch (type) {
      case "chu-de":
        return (
          <h2 className="text-white text-2xl font-bold" key={slug}>
            Phim : "{findNameBySlug(DATA_TOPIC, String(slug))}"
          </h2>
        );
      case "the-loai":
        return (
          <h2 className="text-white text-2xl font-bold" key={slug}>
            Phim : "{findNameBySlug(DATA_CATAGORY, String(slug))}"
          </h2>
        );
      case "quoc-gia":
        return (
          <h2 className="text-white text-2xl font-bold" key={slug}>
            Phim : "{findNameBySlug(DATA_COUNTRY, String(slug))}"
          </h2>
        );

      case "tim-kiem":
        return (
          <h2 className="text-white text-2xl font-bold" key={slug}>
            Tìm kiếm : "{slug}"
          </h2>
        );

      default:
        return <h2 className="text-white text-2xl font-bold"> Phim {slug}</h2>;
    }
  }, [type, slug]);

  if (!type || !["chu-de", "the-loai", "quoc-gia", "tim-kiem"].includes(type)) {
    return <Navigate to="/home" />;
  }

  return (
    <div className=" px-7 lg:px-15 py-6">
      <>{renderTitle}</>

      <div className="pt-7 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-2 md:gap-2 xl:gap-3 overflow-hidden min-h-175">
        {Array.isArray(dataFilter) && dataFilter.length > 0 ? (
          dataFilter.map((item: MovieDataType) => (
            <MovieItemCompoment
              key={item._id}
              _id={item._id}
              duration={item.duration || ""}
              image={String(item.image)}
              image_thumb={String(item.image_thumb)}
              imdb={item.imdb || "5"}
              release_date={String(item.release_date)}
              title={item.title || ""}
              slug={item.slug || " "}
              categories={item.categories || []}
              actors={item.actors || []}
            />
          ))
        ) : (
          <p className="text-white text-center mt-10">Không có phim nào</p>
        )}
      </div>

      <div className="flex justify-center items-center">
        <Pagination
          previousLabel="Trước"
          nextLabel="Tiếp"
          currentPage={page}
          totalPages={100}
          onPageChange={(num) => {
            setPage(num);
          }}
          className="cursor-copy"
          showIcons
        />
      </div>
    </div>
  );
};

export default MoviePage;
