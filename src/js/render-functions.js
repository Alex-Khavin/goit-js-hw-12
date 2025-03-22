import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function markupImg(cards) {
  return cards
  .map(card => {
    return `<li class="gallery-item">
    <a class="gallery-link" href="${card.largeImageURL}">
    <img
    class="gallery-image"
    src="${card.webformatURL}"
    alt="${card.tags}"
    />
    </a>
    <div class="item-subtitle">
    <p class="item-text"><b>Likes</b> ${card.likes}</p>
    <p class="item-text"><b>Views</b> ${card.views}</p>
    <p class="item-text"><b>Comments</b> ${card.comments}</p>
    <p class="item-text"><b>Downloads</b> ${card.downloads}</p>
    </div>
    </li>`;
  })
  .join("");
}

export let gallery = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });