
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { createMarkup } from "./js/render-functions";
import { serviceImage } from "./js/pixabay-api";




const searchImage = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const button = document.querySelector('.search-btn');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-more')
loadBtn.addEventListener("click", loadMore)

button.addEventListener("click", handleSearch);
searchImage.addEventListener("submit", handleSearch);
let page = 1; 
function handleSearch(evt) {
  
  evt.preventDefault();
  const imageInput = document.querySelector(".search-form input");
  const imageValue = imageInput.value.trim();
  if (imageValue === '') {
      iziToast.show({
          message: "Please enter a search query",
          messageColor: ' #fff',
          backgroundColor: '#ef4040',
          position: 'topCenter',
          messageSize: '16px',
          messageLineHeight: '150%',
          iconColor:'white'
        });
        return; 
    }

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
       
const perPage = 15;
const totalPages = Math.ceil(data.total / perPage);


if (page < totalPages) { 
  loadBtn.classList.replace("load-hidden", "load-more");
}   
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

async function loadMore() {

  
  try {
    page += 1;
    const data = await serviceImage(page);
    if (data && data.hits && data.hits.length > 0) {
      galleryList.insertAdjacentHTML ('beforeend', createMarkup(data.hits));
 console.log("Page:", page);
    } else {
      loadBtn.style.display = "none";
    }
  }
  catch(error){}
}

function updateSearch() {
   
    page = 1;
    galleryList.innerHTML = '';
    loader.style.display = 'none';
    
    handleSearch();
}
