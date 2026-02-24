import { Link } from "react-router-dom";
import ActorItemCompoment from "./ActorItemCompoment";
import type { ActorDataType } from "../../helpers/typeData";
import { Pagination } from "flowbite-react";
import { getData } from "../../helpers/request";
import { useQuery } from "@tanstack/react-query";
import LoadingCompoment from "../loading/LoadingCompoment";

const ActorPage = () => {
  const { isPending: isPendingActor, data: actorData } = useQuery({
    queryKey: ["actors"],
    queryFn: () => getData("actors"),
  });

  if (isPendingActor) return <LoadingCompoment />;

  return (
    <div className="px-2 lg:px-10 min-h-175">
      <h2 className="pb-4 font-bold text-2xl text-white">Các diễn viên</h2>
      <>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 xl:gap-3">
          {actorData.map((item: ActorDataType) => (
            <Link to={`/dien-vien/${item?.slug}`} key={item._id}>
              <ActorItemCompoment name={item.name} image={item.image} />
            </Link>
          ))}
        </div>
      </>

      <div className="flex overflow-x-auto sm:justify-center mt-15">
        <Pagination
          currentPage={1}
          totalPages={100}
          onPageChange={(page) => console.log(page)}
          previousLabel="Trước"
          nextLabel="Tiếp"
        />
      </div>
    </div>
  );
};
export default ActorPage;
