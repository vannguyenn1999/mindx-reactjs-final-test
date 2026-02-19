import { useContext, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Navbar,
  TextInput,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import { HiOutlineSearch, HiOutlineUser, HiMenu } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { DATA_CATAGORY, DATA_COUNTRY, DATA_TOPIC } from "../helpers/typeData";
import { useDebounce } from "../helpers/hook";
import { ListDataContext } from "../core/ListContext";

const HeaderCompoment = () => {
  const navigate = useNavigate();
  const { DATA_MOVIE, actorData } = useContext(ListDataContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/tim-kiem/${searchValue}`);
  };

  return (
    <>
      <Navbar fluid>
        <div className="flex justify-between items-center w-full">
          <div className="ps-5 lg:ps-8 xl:ps-10">
            <div className="flex justify-center items-center">
              <Link to={"/home"}>
                <img
                  src="/vite.svg"
                  className="mr-3 h-5 lg:h-8 opacity-100"
                  alt="Flowbite React Logo"
                  loading="lazy"
                />
              </Link>

              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative group max-w-50!">
                  <TextInput
                    ref={inputRef}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    id="search"
                    type="text"
                    icon={HiOutlineSearch}
                    placeholder="Tìm kiếm phim , diễn viên"
                    className="sm:w-30 md:w-40 lg:w-60 xl:w-85"
                    autoComplete="off"
                  />
                  {debouncedSearchTerm &&
                    // eslint-disable-next-line react-hooks/refs
                    document.activeElement === inputRef?.current && (
                      <div className="absolute top-full sm:w-30 md:w-40 lg:w-60 xl:w-85 mt-1 bg-gray-700 text-white rounded shadow-lg z-20">
                        <span className="py-2! px-4 text-sm md:text-[13px] lg:text-[14px]">
                          Danh sách phim
                        </span>
                        <div className="flex flex-col justify-start items-start p-2">
                          {DATA_MOVIE.filter((it) =>
                            it.title.includes(debouncedSearchTerm),
                          ).length > 0 ? (
                            DATA_MOVIE.filter((it) =>
                              it.title.includes(debouncedSearchTerm),
                            ).map((item) => (
                              <div
                                className="p-3 rounded-xl hover:text-amber-300 hover:bg-gray-500 text-center text-sm"
                                key={item._id}
                              >
                                {item.title}
                              </div>
                            ))
                          ) : (
                            <div className="p-3 text-[11px] lg:text-[14px]">
                              Không tìm thấy kết quả nào !
                            </div>
                          )}
                        </div>

                        <span className="py-2 px-4 text-sm md:text-[13px] lg:text-[14px]">
                          Danh sách diễn viên
                        </span>
                        <div className="flex flex-col justify-start items-start p-2 ">
                          {actorData.filter((it) =>
                            it.name.toLowerCase().includes(debouncedSearchTerm),
                          ).length > 0 ? (
                            actorData
                              .filter((it) =>
                                it.name
                                  .toLowerCase()
                                  .includes(debouncedSearchTerm),
                              )
                              .slice(0, 5)
                              .map((item) => (
                                <Link
                                  to={`/dien-vien/${item.slug}`}
                                  className="p-3 flex items-center hover:text-amber-300 hover:bg-gray-500 text-center text-sm w-full rounded-xl cursor-pointer"
                                  key={item._id}
                                >
                                  <Avatar
                                    img={`/actors/${item?.image}`}
                                    alt={item?.name}
                                    rounded
                                    size="md"
                                  />
                                  <span className="ps-2 text-[11px] md:text-[12px] lg:text-[14px]">
                                    {item.name}
                                  </span>
                                </Link>
                              ))
                          ) : (
                            <div className="p-3 text-[11px] lg:text-[14px]">
                              Không tìm thấy kết quả nào !
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </form>
            </div>
          </div>

          <>
            <div className="hidden md:grid grid-cols-4 gap-10 text-white">
              <div className="flex justify-center items-center cursor-pointer group relative">
                <span className="text-white hover:text-amber-400 pe-1 sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]">
                  Chủ đề
                </span>
                <FaCaretDown className="sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-125 bg-gray-700 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10 ">
                  <div className="grid grid-cols-3 p-2">
                    {DATA_TOPIC.map((item) => (
                      <Link to={`/chu-de/${item.slug}`} key={item.id}>
                        <div className="p-3 rounded-xl hover:text-amber-300 hover:bg-gray-500 text-center text-sm">
                          {item.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center cursor-pointer group relative">
                <span className="text-white hover:text-amber-400 pe-1 sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]">
                  Thể loại
                </span>
                <FaCaretDown className="sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-125 bg-gray-700 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                  <div className="grid grid-cols-4 p-2">
                    {DATA_CATAGORY.map((item) => (
                      <Link to={`/the-loai/${item.slug}`} key={item.id}>
                        <div className="p-3 rounded-xl hover:text-amber-300 hover:bg-gray-500 text-center text-sm">
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center cursor-pointer group relative ">
                <span className="text-white hover:text-amber-400 pe-1 sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]">
                  Quốc gia
                </span>
                <FaCaretDown className="sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-37 bg-gray-700 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10 ">
                  <div className="grid grid-cols-1 p-2">
                    {DATA_COUNTRY.map((item) => (
                      <Link to={`/quoc-gia/${item.slug}`} key={item.id}>
                        <div className="p-3 rounded-xl hover:text-amber-300 hover:bg-gray-500 text-center text-sm">
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link to={"/dien-vien"}>
                <div className="flex justify-center items-center cursor-pointer">
                  <span className="text-white hover:text-amber-400 pe-1 sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]">
                    Diễn viên
                  </span>
                </div>
              </Link>
            </div>
          </>

          <div className="flex justify-end items-center xl:me-10 sm:me-2 md:me-5">
            <Button
              pill
              color="light"
              className="cursor-pointer! ring-0 focus:ring-0"
              type="button"
            >
              <HiOutlineUser />
              <span className="ms-1 hidden md:block md:text-[12px] lg:text-[13px] xl:text-[15px]">
                Thành viên
              </span>
            </Button>

            <Dropdown
              size="lg"
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <HiMenu className="block text-white text-2xl ms-1 sm:hidden" />
              )}
            >
              <DropdownItem>
                <Link to={`/the-loai/phim-moi`}>Chủ đề</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to={`/the-loai/hanh-dong`}>Thể Loại</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to={`/quoc-gia/viet-nam`}>Quốc gia</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to={`/dien-vien`}>Diễn viên</Link>
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default HeaderCompoment;
