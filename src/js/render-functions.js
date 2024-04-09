const images = {
	method: "GET"
};
export function createMarkup(arr) {
return arr.map(({ webformatURL, tags, largeImageURL, likes, views, comments, downloads }) => {
           return ` <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}" >
          <img class="gallery-image"
           src="${webformatURL}" 
           alt="${tags}" 
           width = "360"/>
          <ul class="card-descr">
           <li class="card-element"><span class="label">Likes</span> <p class ="value">${likes}</p></li>
            <li class="card-element"><span class="label">Views</span> <p class ="value">${views}</p></li>
            <li class="card-element"><span class="label">Comments</span> <p class ="value">${comments}</p></li>
            <li class="card-element"><span class="label">Downloads</span><p class ="value">${downloads}</p></li></ul>
        </a>
      </li>`
            
        }).join("");
}

