import axios from 'axios';

export const getImages = (page, q) => {
  return axios.get('https://pixabay.com/api/', {
    params: {
      q,
      page,
      key: '33070880-37ece7646195d50eb585b4a16',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
};
