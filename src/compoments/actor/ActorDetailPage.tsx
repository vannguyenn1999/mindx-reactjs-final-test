/* eslint-disable react-hooks/exhaustive-deps */
// import { Link } from "react-router-dom";

import { useContext, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getData } from "../../helpers/request";
import LoadingCompoment from "../loading/LoadingCompoment";
import type { ActorDataType } from "../../helpers/typeData";
import { ListDataContext } from "../../core/ListContext";

const ActorDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { DATA_MOVIE } = useContext(ListDataContext);

  const movieSuggestion = useMemo(() => {
    return DATA_MOVIE.filter((movie) => {
      return movie.actors.some((ac) => ac.slug === `${String(slug)}`);
    });
  }, [slug, DATA_MOVIE]);

  // console.log(movieSuggestion);
  const { isPending: isPendingActor, data: actorData } = useQuery({
    queryKey: ["actors"],
    queryFn: () => getData("actors"),
  });

  const actorDetail = useMemo(() => {
    return isPendingActor
      ? {}
      : actorData.find((actor: ActorDataType) => actor.slug === slug);
  }, [slug, actorData]);

  useEffect(() => {
    if (actorDetail === undefined) {
      navigate("/dien-vien/");
    }
  }, [actorData, slug]);

  if (isPendingActor) return <LoadingCompoment />;

  return (
    <div className="px-2 min-h-175 py-10">
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:border-r border-gray-500 p-1">
          <div className="flex justify-center items-center ">
            <img
              src={`/actors/${actorDetail?.image}`}
              alt={actorDetail?.name}
              srcSet=""
              className="object-cover rounded-2xl w-50 h-50 bg-gray-600"
              loading="lazy"
            />
          </div>
          <h3 className="py-5 font-bold text-2xl text-white text-center">
            {actorDetail?.name || " "}
          </h3>

          <div className="px-5">
            <div className="mb-3">
              <h4 className="text-white font-bold">Giới thiệu :</h4>
              <span className="text-sm text-white">
                {actorDetail?.info || ""}
              </span>
            </div>

            <div className="mb-3">
              <h4 className="text-white font-bold">Giới tính :</h4>
              <span className="text-sm text-white">
                {actorDetail?.gender || ""}
              </span>
            </div>

            <div className="mb-3">
              <h4 className="text-white font-bold">Quốc tịch :</h4>
              <span className="text-sm text-white">
                {actorDetail?.country || ""}
              </span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 pt-5 lg:pt-0">
          <div>
            <h2 className="text-white font-bold text-xl">
              {" "}
              Các bộ phim đã tham gia
            </h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-4 pt-5">
            {movieSuggestion.length > 0 &&
              movieSuggestion.slice(0, 6).map((item) => {
                return (
                  <Link
                    to={`/phim/${item.slug}`}
                    key={item._id}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src={item.image ? String(item.image) : ""}
                      alt={item.title}
                      className="block rounded-2xl object-cover w-62 h-50 xl:h-76 bg-gray-600"
                      loading="lazy"
                    />
                    <span className="flex justify-center text-white text-sm pt-2">
                      {item.title}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetailPage;
