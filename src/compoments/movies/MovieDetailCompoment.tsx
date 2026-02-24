import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ListDataContext } from "../../core/ListContext";

const MovieDetailCompoment = () => {
  const { slug } = useParams();
  const { DATA_MOVIE } = useContext(ListDataContext);

  const movie = useMemo(() => {
    return DATA_MOVIE.find((item) => item.slug === slug);
  }, [DATA_MOVIE, slug]);

  console.log(movie);

  return <div>MovieDetailCompoment</div>;
};

export default MovieDetailCompoment;
