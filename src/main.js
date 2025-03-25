import { fetchData } from "./js/pixabay-api";
import { markupImg } from "./js/render-functions"
import { gallery } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let inputData = "";
let searchQuery = "";
let page = 1;
let totalPages = 1;

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

    if (inputData === "") {
         iziToast.error({
                message: 'Fill in the search field!',
                messageColor: 'white',
                position: 'topRight',
                color: '#ef4040',
         });
        form.reset();
        return;
    }

    searchQuery = inputData;
    galleryList.innerHTML = "";
    loader.classList.remove("hidden");

    try {
        const { hits: images, totalHits } = await fetchData(inputData, page);
        if (totalHits === 0) {
        // iziToast.error({
        //     message: 'Sorry, there are no images matching your search query. Please try again!',
        //     messageColor: 'white',
        //     position: 'topRight',
        //     color: '#ef4040',
        //     });
        // form.reset();
        return;
        }
        
        totalPages = Math.ceil(totalHits / 15);

        galleryList.insertAdjacentHTML("beforeend", markupImg(images));
        gallery.refresh();

        if (page < totalPages) {
            btnLoadMore.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        loader.classList.add("hidden");
    }

    form.reset();
    inputData = "";
};

async function loadMore() {
    page += 1;
    loader.classList.remove("hidden");
    
    try {
        const {hits: newImg} = await fetchData(searchQuery, page);
        galleryList.insertAdjacentHTML("beforeend", markupImg(newImg));
        gallery.refresh();
        
        const itemHeight = document.querySelector(".gallery-item");
        if (itemHeight) {
            const cardHeight = itemHeight.getBoundingClientRect().height * 2;
            window.scrollBy({ top: cardHeight, behavior: "smooth" });
        }
        
        if (page === totalPages) {
            iziToast.error({
                position: "topRight",
                message: "We're sorry, but you've reached the end of search results.",
                messageColor: 'white',
                color: '#ef4040',
            });
        btnLoadMore.classList.add("hidden");
    }
  } catch (error) {
    console.log(error);
  } finally {
        loader.classList.add("hidden");
    }
};






