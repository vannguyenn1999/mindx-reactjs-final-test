/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type {
  MovieDataType,
  ActorDataType,
  CategoryDataType,
} from "../helpers/typeData";
import { getData } from "../helpers/request";
import LoadingCompoment from "../compoments/loading/LoadingCompoment";

type ListContextType = {
  DATA_MOVIE: MovieDataType[];
  actorData: ActorDataType[] | [];
  categoryData: CategoryDataType[] | [];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const ListDataContext = createContext<ListContextType>(
  {} as ListContextType,
);

export const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState<string>("");

  const { isPending: isPendingMovie, data: movieData } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getData("movies"),
  });

  const { isPending: isPendingActor, data: actorData } = useQuery({
    queryKey: ["actors"],
    queryFn: () => getData("actors"),
  });

  const { isPending: isPendingCategory, data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData("categories"),
  });

  const DATA_MOVIE = useMemo(
    () =>
      movieData?.filter((task: any) =>
        task.title?.toLowerCase().includes(search.toLowerCase()),
      ),
    [movieData, search],
  );
  if (isPendingMovie || isPendingActor || isPendingCategory)
    return <LoadingCompoment />;

  return (
    <ListDataContext.Provider
      value={{
        DATA_MOVIE,
        actorData,
        categoryData,
        search,
        setSearch,
      }}
    >
      {children}
    </ListDataContext.Provider>
  );
};
