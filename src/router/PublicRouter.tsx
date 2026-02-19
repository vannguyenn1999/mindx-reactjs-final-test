import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

import MasterLayout from "../layout/MasterLayout";

import HomePage from "../compoments/home/HomePage";

const ActorPage = lazy(() => import("../compoments/actor/ActorPage"));
const ActorDetailPage = lazy(
  () => import("../compoments/actor/ActorDetailPage"),
);

const PublicRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MasterLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dien-vien" element={<ActorPage />} />
          <Route path="/dien-vien/:slug" element={<ActorDetailPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRouter;
