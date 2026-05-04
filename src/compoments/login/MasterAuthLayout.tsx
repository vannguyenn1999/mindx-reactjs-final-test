import { Outlet } from "react-router-dom";

const MasterAuthLayout = () => {
  return (
    <>
      <main className="min-h-screen mx-auto bg-gray-800 max-h-auto flex items-center justify-center">
        <div className="w-full h-screen flex justify-center items-center">
          <div className="bg-gray-100 rounded-lg shadow-xl w-120">
            <Outlet />
          </div>
        </div>
      </main>
      
    </>
  );
};
export default MasterAuthLayout;
