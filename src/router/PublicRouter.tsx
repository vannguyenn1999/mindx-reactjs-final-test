import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

import MasterLayout from "../layout/MasterLayout";

import HomePage from "../compoments/home/HomePage";
import LoginCompoment from "../compoments/login/LoginCompoment";

const ActorPage = lazy(() => import("../compoments/actor/ActorPage"));
const MoviePage = lazy(() => import("../compoments/movies/MoviePage"));

const ActorDetailPage = lazy(
  () => import("../compoments/actor/ActorDetailPage"),
);

const MovieDetail = lazy(
  () => import("../compoments/movies/MovieDetailCompoment"),
);

const PublicRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MasterLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/:type/:slug" element={<MoviePage />} />
          <Route path="/phim/:slug" element={<MovieDetail />} />
          <Route path="/dien-vien" element={<ActorPage />} />
          <Route path="/dien-vien/:slug" element={<ActorDetailPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>

        <Route path="/login" element={<LoginCompoment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRouter;
