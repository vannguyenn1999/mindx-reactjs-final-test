import { useContext, useMemo } from 'react';
import MovieScroll from './MovieScroll';
import TopicLayout from './TopicLayout';

import MovieBackground from './MovieBackground';
import { ListDataContext } from '../../core/ListContext';
import { getRandomElements } from '../../helpers/tools';
import ManualSlider from './ManualSlider';

const HomePage = () => {
  const { DATA_MOVIE } = useContext(ListDataContext);
  const movieScroll = useMemo(
    () => getRandomElements(DATA_MOVIE, 10),
    [DATA_MOVIE]
  );

  const movieTypeActic = useMemo(() => {
    return DATA_MOVIE;
  }, [DATA_MOVIE]);
  return (
    <div>
      <MovieBackground />
      <TopicLayout />
      <MovieScroll
        title="Xem gì hôm nay ?"
        data={movieScroll}
        slidesPerView={5}
        time={2000}
      />
      <MovieScroll
        title="Phim hành động mới"
        data={movieTypeActic}
        slidesPerView={6}
        time={3000}
      />

      <ManualSlider />
    </div>
  );
};
export default HomePage;
