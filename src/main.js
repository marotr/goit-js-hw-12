
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

const searchInput = document.querySelector(".search-form input");
searchInput.addEventListener("input", () => {
  page = 1;
  galleryList.innerHTML = '';
  
});
searchImage.addEventListener("submit", handleSearch);

let page = 1; 
let currentKeyword = '';

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
function handleSearch(evt) {
  
  evt.preventDefault();
  const imageInput = document.querySelector(".search-form input");
 currentKeyword = imageInput.value.trim();
  if (currentKeyword === '') {
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

 showLoader();
  galleryList.innerHTML = '';

 

  serviceImage(currentKeyword)
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
     hideLoader();
      searchImage.reset();
    });
}

async function loadMore() {

    showLoader();
    loadBtn.disabled = true;
    
    try {
        page++; 
        const data = await serviceImage(currentKeyword, page);
        
        if (data && data.hits && data.hits.length > 0) {
            galleryList.insertAdjacentHTML('beforeend', createMarkup(data.hits));
          toggleLoadButton(data.totalHits);
          
          smoothScrollToNextGroup()

           
        } else {
          loadBtn.style.display = "none"; 
         
          iziToast.show({
                    message: "We're sorry, but you've reached the end of search results.",
                    messageColor: '#fff',
                    backgroundColor: '#ef4040',
                    position: 'topCenter',
                    messageSize: '16px',
                    messageLineHeight: '150%',
                    iconColor: 'white'
                });
        }
   
    } catch (error) {
     
       loadBtn.style.display = "none";
        iziToast.show({
            message: "That is the end of the search",
            messageColor: ' #fff',
            backgroundColor: '#ef4040',
            position: 'topCenter',
            messageSize: '16px',
            messageLineHeight: '150%',
            iconColor: 'white'
        });
       
    } finally {
      loadBtn.disabled = false;
        hideLoader();
    }
}



function toggleLoadButton(totalHits) {
  
  
  if (page * 15 >= totalHits) {
    
    loadBtn.style.display = 'none';
  } else {
  
    loadBtn.style.display = 'block';
  }
}



function smoothScrollToNextGroup() {
    const firstGalleryItem = document.querySelector('.gallery a');
    if (firstGalleryItem) {
        const galleryItemHeight = firstGalleryItem.getBoundingClientRect().height;
        window.scrollBy({
            top: galleryItemHeight * 2, 
            behavior: 'smooth' 
        });
    } else {
        
    }
}





