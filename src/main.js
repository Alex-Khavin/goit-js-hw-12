import { fetchData } from "./js/pixabay-api";
import { markupImg } from "./js/render-functions"
import { gallery } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let inputData = "";

const options = {
    params: {
        key: "49358798-a0fde913d86352b572e9384bf",
        q: "",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        }
};

const formData = document.querySelector(".form");
const formInput = document.querySelector("input");
const galleryList = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

formData.addEventListener("submit", formSubmit);
formInput.addEventListener("input", onInput);


function onInput(event) {
    inputData = event.target.value.trim();
};

function formSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (inputData === "") {
         iziToast.show({
                message: 'Fill in the search field!',
                messageColor: 'white',
                iconUrl: './public/blocked.svg',
                position: 'topRight',
                color: '#ef4040',
         });
        form.reset();
        return;
    }

    options.params.q = inputData;

    galleryList.innerHTML = "";
    loader.classList.remove("hidden");

    fetchData(options).then(images => {
        galleryList.insertAdjacentHTML("beforeend", markupImg(images));
        gallery.refresh();
    })
        .finally(() => {
           loader.classList.add("hidden");
       })

    form.reset();
    inputData = "";
}







