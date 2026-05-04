import { useContext, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  Navbar,
  TextInput,
  Dropdown,
  DropdownItem,
} from 'flowbite-react';
import { HiOutlineSearch, HiOutlineUser } from 'react-icons/hi';
import {
  FaCaretDown,
  FaHeart,
  FaSignOutAlt,
  FaTh,
  FaUser,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { DATA_CATAGORY, DATA_COUNTRY, DATA_TOPIC } from '../helpers/typeData';
import { useDebounce } from '../helpers/hook';
import { ListDataContext } from '../core/ListContext';
import { useAuth } from '../core/AuthContext';

const HeaderCompoment = () => {
  const navigate = useNavigate();
  const { DATA_MOVIE, actorData } = useContext(ListDataContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { auth, logout } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/tim-kiem/${searchValue}`);
  };

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi localStorage hoặc cookie
    logout();
  };

  return (
    <>
      <Navbar fluid>
        <div className="flex justify-between items-center w-full z-40!">
          <div className="ps-5 lg:ps-8 xl:ps-10">
            <div className="flex justify-center items-center">
              <Link to={'/home'}>
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
                    className="sm:w-35 md:w-40 lg:w-60 xl:w-85"
                    autoComplete="off"
                  />
                  {debouncedSearchTerm &&
                    // eslint-disable-next-line react-hooks/refs
                    document.activeElement === inputRef?.current && (
                      <div className="absolute top-full sm:w-35 md:w-60 lg:w-60 xl:w-85 mt-1 bg-gray-700 text-white rounded shadow-lg z-20 max-h-50 md:max-h-90 lg:max-h-160 overflow-y-auto ">
                        <span className="py-2! px-4 text-sm md:text-[13px] lg:text-[14px]">
                          Danh sách phim
                        </span>
                        <div className="flex flex-col justify-start items-start p-2">
                          {DATA_MOVIE.filter((it) =>
                            it?.title
                              .toLowerCase()
                              .includes(debouncedSearchTerm)
                          ).length > 0 ? (
                            DATA_MOVIE.filter((it) =>
                              it?.title
                                .toLowerCase()
                                .includes(debouncedSearchTerm)
                            )
                              .slice(0, 15)
                              .map((item) => (
                                <Link
                                  to={`/phim/${item.slug}`}
                                  className="p-1 md:p-2 rounded-xl hover:text-amber-300 hover:bg-gray-500 text-sm w-full cursor-pointer flex items-center justify-start"
                                  key={item._id}
                                >
                                  <img
                                    src={
                                      item.image.includes('https://') ||
                                      item.image.includes(
                                        'data:image/jpeg;base64'
                                      )
                                        ? item.image
                                        : `/movies/thumbs/${item?.image}`
                                    }
                                    alt={item?.title}
                                    loading="lazy"
                                    className="object-cover h-10 w-10 md:h-15 md:w-15 xl:h-20 xl:max-w-25 rounded-lg me-3 bleck md:block"
                                  />
                                  <div className="flex flex-col w-full">
                                    <span className="text-[11px] md:text-[12px] lg:text-[14px]">
                                      {item.title}
                                    </span>

                                    <div className="flex justify-start mt-1 md:mt-3 items-center ">
                                      <span className="text-gray-400 text-xs">
                                        {item.imdb}
                                      </span>
                                      <span className="mx-2 text-xl">
                                        &#8226;
                                      </span>
                                      <span className="text-gray-400 text-xs">
                                        {item.release_date.split('-')[2]}
                                      </span>
                                      <span className="mx-2 text-xl">
                                        &#8226;
                                      </span>
                                      <span className="text-gray-400 text-xs">
                                        {item.duration}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
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
                            it.name.toLowerCase().includes(debouncedSearchTerm)
                          ).length > 0 ? (
                            actorData
                              .filter((it) =>
                                it.name
                                  .toLowerCase()
                                  .includes(debouncedSearchTerm)
                              )
                              .slice(0, 15)
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-125 bg-gray-700 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50! ">
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-125 bg-gray-700 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50!">
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-37 bg-gray-700 text-white rounded shadow-lg opacity-0 group-hover:opacity-90 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50!">
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

              <Link to={'/dien-vien'}>
                <div className="flex justify-center items-center cursor-pointer">
                  <span className="text-white hover:text-amber-400 pe-1 sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]">
                    Diễn viên
                  </span>
                </div>
              </Link>
            </div>
          </>

          <div className="flex justify-end items-center xl:me-10 sm:me-2 md:me-5">
            {auth ? (
              <Dropdown
                size="lg"
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <div className="flex items-center cursor-pointer">
                    <Avatar
                      img="data:image/jpeg;base64,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"
                      rounded
                      size="md"
                    />
                    <span className="ms-2 text-white">{auth?.user?.name}</span>
                  </div>
                )}
              >
                <DropdownItem>
                  <div className="flex items-center">
                    <FaUser />
                    <span className="ms-1">Hồ Sơ</span>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="flex items-center">
                    <FaHeart />
                    <span className="ms-1">Phim Ưu Thích</span>
                  </div>
                </DropdownItem>
                {auth?.user?.role === 'admin' && (
                  <DropdownItem>
                    <div className="flex items-center">
                      <FaTh />
                      <span className="ms-1">Quản Lý</span>
                    </div>
                  </DropdownItem>
                )}

                <DropdownItem onClick={handleLogout}>
                  <div className="flex items-center">
                    <FaSignOutAlt />
                    <span className="ms-1">Đăng Xuất</span>
                  </div>
                </DropdownItem>
              </Dropdown>
            ) : (
              <Button
                pill
                color="light"
                className="cursor-pointer! ring-0 focus:ring-0"
                type="button"
                onClick={() => navigate('/login')}
              >
                <HiOutlineUser />
                <span className="ms-1 hidden md:block md:text-[12px] lg:text-[13px] xl:text-[15px]">
                  Thành viên
                </span>
              </Button>
            )}
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default HeaderCompoment;
