export type MovieDataType = {
    _id: string;
    title: string;
    imdb: string;
    duration: string;
    slug: string;
    image: string;
    image_thumb: string;
    release_date: string;
    actors: ActorDataType[];
    categories: string[];
    country?: string;
    info?: string;
}


export type ActorDataType = {
    _id: string;
    name: string;
    info: string;
    image: string;
    slug: string;
    gender: string;
    country: string;
}

export type CategoryDataType = {
    _id: string;
    name: string;
}


export const DATA_TOPIC = [
    { id: 1, title: "Phim mới", slug: "phim-moi-cap-nhat" },
    { id: 2, title: "Phim hot", slug: "phim-hot" },
    { id: 3, title: "Phim rạp", slug: "phim-chieu-rap" },
    { id: 4, title: "Phim bộ", slug: "phim-bo" },
    { id: 5, title: "Phim lẻ", slug: "phim-le" },
    { id: 6, title: "Phim 4k", slug: "phim-4k" },
];
export const DATA_CATAGORY = [
    { id: 1, name: "Hành động", slug: "hanh-dong" },
    { id: 2, name: "Viễn tưởng", slug: "vien-tuong" },
    { id: 3, name: "Tình cảm", slug: "tinh-cam" },
    { id: 4, name: "Hoạt hình", slug: "hoat-hinh" },
    { id: 5, name: "Kinh dị", slug: "kinh-di" },
    { id: 6, name: "Phiêu lưu", slug: "phieu-luu" },
    { id: 7, name: "Hài hước", slug: "hai-huoc" },
    { id: 8, name: "Tâm lý", slug: "tam-ly" },
    { id: 9, name: "Chiến tranh", slug: "chien-tranh" },
    { id: 10, name: "Thể thao", slug: "the-thao" },
    { id: 11, name: "Âm nhạc", slug: "am-nhac" },
    { id: 12, name: "Lịch sử", slug: "lich-su" },
    { id: 13, name: "Gia đình", slug: "gia-dinh" },
    { id: 14, name: "Tội phạm", slug: "toi-pham" },
    { id: 15, name: "Giật gân", slug: "giat-gan" },
    { id: 16, name: "Thần thoại", slug: "than-thoai" },
];
export const DATA_COUNTRY = [
    {
        id: 1,
        name: "Việt Nam",
        slug: "viet-nam",
    },
    {
        id: 2,
        name: "Hàn Quốc",
        slug: "han-quoc",
    },
    {
        id: 3,
        name: "Mỹ",
        slug: "my",
    },
    {
        id: 4,
        name: "Thái Lan",
        slug: "thai-lan",
    },
    {
        id: 5,
        name: "Trung Quốc",
        slug: "trung-quoc",
    },
    {
        id: 6,
        name: "Nhật Bản",
        slug: "nhat-ban",
    },
];