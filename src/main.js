import { fetchData } from "./js/pixabay-api";
import { markupImg } from "./js/render-functions"
import { gallery } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let inputData = "";
let page = 1;
let totalPages = 1;

const options = {
    params: {
        key: "49358798-a0fde913d86352b572e9384bf",
        q: "",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page: page,
        }
};

const formData = document.querySelector(".form");
const formInput = document.querySelector("input");
const galleryList = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const btnLoadMore = document.querySelector(".btn");


formData.addEventListener("submit", formSubmit);
formInput.addEventListener("input", onInput);
btnLoadMore.addEventListener("click", loadMore);

function onInput(event) {
    inputData = event.target.value.trim();
};

async function formSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    btnLoadMore.classList.add("hidden");
    page = 1;
    options.params.page = page;

    if (inputData === "") {
         iziToast.error({
                message: 'Fill in the search field!',
                messageColor: 'white',
                // iconUrl: '/blocked.svg',
                position: 'topRight',
                color: '#ef4040',
         });
        form.reset();
        return;
    }

    options.params.q = inputData;

    galleryList.innerHTML = "";
    loader.classList.remove("hidden");

    try {
        const {hits: images, totalHits } = await fetchData(options);
           if (images.length === 0) {
            btnLoadMore.classList.add("hidden");
            return;
           }
        
        totalPages = Math.ceil(totalHits / options.params.per_page);

        galleryList.insertAdjacentHTML("beforeend", markupImg(images));
        btnLoadMore.classList.remove("hidden");
        gallery.refresh();

        if (page < totalPages) {
            btnLoadMore.classList.remove("hidden");
        }
    } finally {
        loader.classList.add("hidden");
    }

    form.reset();
    inputData = "";
};

async function loadMore() {
    page += 1;
    options.params.page = page;
    loader.classList.remove("hidden");
    
    
    try {
        const {hits: newImg} = await fetchData(options);
        galleryList.insertAdjacentHTML("beforeend", markupImg(newImg));
        gallery.refresh();
        
        const itemHeight = document.querySelector(".gallery-item");
        if (itemHeight) {
            const cardHeight = itemHeight.getBoundingClientRect().height*2;
            console.log("🚀 ~ loadMore ~ cardHeight:", cardHeight)
            window.scrollBy({ top: cardHeight, behavior: "smooth" });
        }
        
        if (page === totalPages) {
            iziToast.error({
                position: "topRight",
                message: "We're sorry, but you've reached the end of search results.",
                messageColor: 'white',
                color: '#ef4040',
            });
        loader.classList.add("hidden");
        btnLoadMore.classList.add("hidden");
        return;
    }
  } catch (error) {
    console.log(error);
  } finally {
        loader.classList.add("hidden");
    }
};






