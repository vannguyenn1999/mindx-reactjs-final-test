/* eslint-disable @typescript-eslint/no-explicit-any */


export const findNameBySlug = (data: any, key: string) => {
    const result = data.find((item: any) => item.slug === key);
    return result?.title ? result?.title : result?.name
}

// ? Chuyển đổi thời gian từ "YYYY-MM-DD" thành "DD-MM-YYYY"
export const convertTime = (time: string, type = 1) => {
    const dateObj = new Date(time);
    // Lấy ngày, tháng, năm
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = dateObj.getFullYear();
    // Ghép lại theo định dạng dd-mm-yyyy
    if (type === 1) {
        return `${day}-${month}-${year}`;
    }
    return `${year}-${month}-${day}`;
}

// ? Lấy ngẫu nhiên số phần tử từ một mảng
export const getRandomElements = (arr: any[], count: number) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    // return shuffled.slice(0, count);
    return [...new Set(shuffled.slice(0, count))];
}

// ? Lấy ID video từ URL YouTube
export const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}