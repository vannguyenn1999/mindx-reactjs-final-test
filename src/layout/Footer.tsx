import {
  Footer,
  FooterBrand,
  FooterCopyright,
  // FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsFacebook, BsYoutube, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterCompoment = () => {
  return (
    <Footer container className="rounded-none">
      <div className="w-full ps-1 lg:ps-8 xl:ps-10">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand
              href="#"
              // src={import.meta.env.VITE_REACT_APP_IMG_HEADER}
              src="/vite.svg"
              alt="Web phim"
              name="Web phim"
            />
            <div className="mt-4!">
              <span className="bg-gray-100 rounded-2xl py-1 px-4 text-sm md:text-[16px] text-gray-700 flex my-2 md:my-0">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--twemoji me-2"
                  preserveAspectRatio="xMidYMid meet"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#DA251D"
                      d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
                    ></path>
                    <path
                      fill="#FF0"
                      d="M19.753 16.037L18 10.642l-1.753 5.395h-5.672l4.589 3.333l-1.753 5.395L18 21.431l4.589 3.334l-1.753-5.395l4.589-3.333z"
                    ></path>
                  </g>
                </svg>
                Hoàng Sa , Trường Sa là của Việt Nam
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <FooterTitle
                title="Thông tin về chúng tôi"
                className="text-[12px] md:text-sm"
              />
              <FooterLinkGroup col>
                <FooterLink href="#">Giới thiệu</FooterLink>
                <FooterLink href="#">Liên hệ</FooterLink>
                <FooterLink href="#">Hỏi - đáp</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle
                title="Chính Sách"
                className="text-[12px] md:text-sm"
              />
              <FooterLinkGroup col>
                <FooterLink href="#">Chính sách bảo mật</FooterLink>
                <FooterLink href="#">Điều khoản sử dụng</FooterLink>
                <FooterLink href="#">Thông tin thêm</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <hr className="pb-3 mt-3 text-gray-500" />
        <div className="w-full flex items-center justify-between">
          <FooterCopyright
            href="#"
            by="Web Phim"
            year={new Date().getFullYear()}
            className=""
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsYoutube} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCompoment;
