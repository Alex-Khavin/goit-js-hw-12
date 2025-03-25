import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = "49358798-a0fde913d86352b572e9384bf";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchData(query, page = 1) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page: page,
        }
        });

        if (!response.data.hits.length) {
            throw new Error("Sorry, there are no images matching your search query. Please try again!");
           }
           return response.data;
    } catch (error) {
        iziToast.error({
            message: `${error.message}`,
            messageColor: 'white',
            position: 'topRight',
            color: '#ef4040',
        });
        return { hits: [], totalHits: 0 };
    }
};
     
