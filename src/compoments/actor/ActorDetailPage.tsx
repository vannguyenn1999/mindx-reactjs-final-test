// import { Link } from "react-router-dom";

import { useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ListDataContext } from "../../core/ListContext";

const ActorDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { actorData } = useContext(ListDataContext);
  const navigate = useNavigate();

  const actorDetail = useMemo(() => {
    return actorData.find((actor) => actor.slug === slug);
  }, [slug, actorData]);

  useEffect(() => {
    if (actorDetail === undefined) {
      navigate("/dien-vien/");
    }
  }, [actorDetail, navigate]);

  return (
    <div className="px-20 py-5 min-h-175">
      <div className="grid grid-cols-4">
        <div className="border-r border-gray-500 p-5">
          <div>
            <img
              src={`/actors/${actorDetail?.image}`}
              alt={actorDetail?.name}
              srcSet=""
              className="object-cover rounded-2xl w-50 h-50 bg-gray-600"
              loading="lazy"
            />
          </div>
          <h3 className="py-5 font-bold text-2xl text-white">
            {actorDetail?.name || " "}
          </h3>

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

          {/* <div className="mb-3">
            <h4 className="text-white font-bold">Ngày sinh :</h4>
            <span className="text-sm text-white">
              {convertTime(data?.results[0]?.birthday)}
            </span>
          </div> */}
        </div>
        <div className="col-span-3 p-5">
          <div>
            <h2 className="text-white font-bold text-xl">
              {" "}
              Các bộ phim đã tham gia
            </h2>
          </div>

          {/* <div className="grid grid-cols-5 gap-4 pt-5">
            {Array.isArray(dataSuggestion) &&
              dataSuggestion.map((item: MovieItem) => {
                return (
                  <Link to={`/xem-phim/${item.slug}`} key={item.id}>
                    <img
                      src={item.image_avatar ? String(item.image_avatar) : ""}
                      alt={item.title}
                      className="rounded-2xl object-cover"
                      loading="lazy"
                    />
                    <span className="flex justify-center text-white text-sm pt-2">
                      {item.title}
                    </span>
                  </Link>
                );
              })}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ActorDetailPage;
