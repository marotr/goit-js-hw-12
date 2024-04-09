
export function serviceImage(image) {
  const BASE_URL = "https://pixabay.com/api/";
  const API_KEY = "43193709-9f2e77a8cd9049868dd3fabee"
  const params = new URLSearchParams({
    key: API_KEY,
    q: image,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true'

  })

  return fetch(`${BASE_URL}?${params}`).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
  })
    .catch(error => {
      
      throw error
      
    });
}




    

  
  
 


