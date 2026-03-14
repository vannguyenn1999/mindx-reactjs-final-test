import { Outlet } from "react-router-dom";
import { FaArrowCircleUp } from "react-icons/fa";

import HeaderCompoment from "./Header";
import FooterCompoment from "./Footer";

const MasterLayout = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <HeaderCompoment />
      <main className="min-h-screen bg-[#2a374a] mx-auto max-h-auto">
        <Outlet />
      </main>
      <div
        onClick={() => handleScrollToTop()}
        className="fixed bottom-12 right-5 text-white text-3xl cursor-pointer"
      >
        <FaArrowCircleUp />
      </div>
      <FooterCompoment />
    </>
  );
};
export default MasterLayout;
