import axios from "axios";



export const getData = (name: string) => {
    try {
        return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}${name}?apiKey=${import.meta.env.VITE_REACT_APP_API_KEY}`).then((res) => {
            // console.log(res);
            return res.data?.data?.data ?? [];
        }).catch((err) => {
            console.error("Error in request:", err);
            return [];
        })
    } catch (error) {
        console.error("Error fetching data:", error);
        return []
    }
}

