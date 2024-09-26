// apiService.ts
import axios from 'axios';
import Config from 'react-native-config';
const API_KEY = Config.API_KEY;
const BASE_URL =Config.BASE_URL
console.log(Config)
const apiService = {
  fetchImages: async (limit: number = 10, page: number = 0) => {
    const response = await axios.get(`${BASE_URL}/images`, {
      params: { limit, page, order: 'DESC' },
      headers: { 'x-api-key': API_KEY },
    });
    return response.data;
  },

  fetchVotes: async () => {
    const response = await axios.get(`${BASE_URL}/votes`, {
      headers: { 'x-api-key': API_KEY },
    });
    return response.data;
  },

  addVote: async (image_id: string, value: number) => {
    const response = await axios.post(
      `${BASE_URL}/votes`,
      { image_id, value },
      { headers: { 'x-api-key': API_KEY } }
    );
    return response.data;
  },

  addFavourite: async (image_id: string) => {
    const response = await axios.post(
      `${BASE_URL}/favourites`,
      { image_id },
      { headers: { 'x-api-key': API_KEY } }
    );
    return response.data;
  },
 
  removeFavourite: async (favourite_id: string) => {
    await axios.delete(`${BASE_URL}/favourites/${favourite_id}`, {
      headers: { 'x-api-key': API_KEY },
    });
  },
  uploadCatImage: async (image: any) => {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      name: image.fileName || 'cat-photo.jpg',
      type: image.type || 'image/jpeg', 
    });
    formData.append('sub_id', 'my-user-1'); 

      const response = await axios.post(`${BASE_URL}/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': API_KEY,
        },
      });

      return response.data; 
    } 
};


export default apiService;
