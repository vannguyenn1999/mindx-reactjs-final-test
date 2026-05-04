import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import MasterLayout from '../layout/MasterLayout';

import HomePage from '../compoments/home/HomePage';
import { ListProvider } from '../core/ListContext';

const ActorPage = lazy(() => import('../compoments/actor/ActorPage'));
const MoviePage = lazy(() => import('../compoments/movies/MoviePage'));

const ActorDetailPage = lazy(
  () => import('../compoments/actor/ActorDetailPage')
);

const MovieDetail = lazy(
  () => import('../compoments/movies/MovieDetailCompoment')
);

const MovieCompoment = lazy(
  () => import('../compoments/movies/MovieCompoment')
);

const MasterAuthLayout = lazy(
  () => import('../compoments/login/MasterAuthLayout')
);
const LoginCompoment = lazy(() => import('../compoments/login/LoginCompoment'));
const RegisterCompoment = lazy(
  () => import('../compoments/login/RegisterCompoment')
);

const PublicRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* NHÓM 1: Các trang cần dữ liệu phim ảnh (Giao diện chính) */}
        <Route
          element={
            <ListProvider>
              <MasterLayout />
            </ListProvider>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/:type/:slug" element={<MoviePage />} />
          <Route path="/phim/:slug" element={<MovieDetail />} />
          <Route path="/xem-phim/:slug" element={<MovieCompoment />} />
          <Route path="/dien-vien" element={<ActorPage />} />
          <Route path="/dien-vien/:slug" element={<ActorDetailPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>

        {/* NHÓM 2: Các trang Auth - Hoàn toàn không nằm trong ListProvider */}
        <Route element={<MasterAuthLayout />}>
          <Route path="/login" element={<LoginCompoment />} />
          <Route path="/register" element={<RegisterCompoment />} />
        </Route>

        {/* NHÓM 3: Xử lý 404 (Thường nên dùng chung Layout chính hoặc trang riêng) */}
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRouter;
