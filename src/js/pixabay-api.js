import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export async function fetchData(options) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?`, options);
        if (!response.data?.hits?.length) {
            throw new Error("Sorry, there are no images matching your search query. Please try again!");
           }
           return response.data;
    } catch (error) {
        iziToast.error({
            message: `${error.message}`,
            messageColor: 'white',
            // iconUrl: '/blocked.svg',
            position: 'topRight',
            color: '#ef4040',
        });
           return [];
    }
};
     
