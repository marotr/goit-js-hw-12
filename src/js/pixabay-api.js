import axios from 'axios';
const API_KEY = "43193709-9f2e77a8cd9049868dd3fabee"
export async function serviceImage(image, page = "1") {

    const parameters = {
      key: API_KEY,
      q: image,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 15
    };
 
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: parameters
    });
 
  
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  }
  catch (error) {
    throw error;
    
  }
}
  






  





    

  
  
 


