import { useContext } from "react";

import { ListDataContext } from "../../core/ListContext";
import { Link } from "react-router-dom";
import ActorItemCompoment from "./ActorItemCompoment";
import type { ActorDataType } from "../../helpers/typeData";
import { Pagination } from "flowbite-react";

const ActorPage = () => {
  const { actorData } = useContext(ListDataContext);

  return (
    <div className="px-20 py-5 min-h-175">
      <h2 className="pb-4 font-bold text-2xl text-white">Các diễn viên</h2>
      <>
        <div className="grid grid-cols-6 gap-4">
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
