
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { createMarkup } from "./js/render-functions";
import { serviceImage } from "./js/pixabay-api";




const searchImage = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const button = document.querySelector('button');
const loader = document.querySelector('.loader');

button.addEventListener("click", handleSearch);
searchImage.addEventListener("submit", handleSearch);

function handleSearch(evt) {
  evt.preventDefault();
  const imageInput = document.querySelector(".search-form input");
  const imageValue = imageInput.value.trim();

  loader.style.display = 'block';
  galleryList.innerHTML = '';


  serviceImage(imageValue)
    .then(data => { 
      if (data.hits.length === 0) {
        iziToast.show({
          message: "Sorry, there are no images matching your search query. Please try again!",
          messageColor: ' #fff',
          backgroundColor: '#ef4040',
          position: 'topCenter',
          messageSize: '16px',
          messageLineHeight: '150%',
          iconColor:'white'
        });
      } else {
          galleryList.innerHTML = createMarkup(data.hits);
          const lightboxOptions = {
    captionDelay: 250,
    captionsData: 'alt',
    captionPosition: 'bottom',
    

};

const lightbox = new SimpleLightbox('.gallery a', lightboxOptions);
lightbox.refresh();
      }
    })
      .catch(error => {
        galleryList.innerHTML = '';
      iziToast.show({
        message: "An error occurred while fetching images. Please try again later.",
        messageColor: ' #fff',
        backgroundColor: '#ef4040',
        position: 'topCenter',
        messageSize: '16px',
        messageLineHeight: '150%',
        iconColor:'white'
      });
    })
      .finally(() => {
    
      loader.style.display = 'none';
      searchImage.reset();
    });
}



