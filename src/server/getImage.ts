import axios from 'axios';
require('dotenv').config();
//const fetch = require('node-fetch');

const link = 'https://api.unsplash.com';
const key = process.env.REACT_APP_API_KEY;

const getImage = async (type: string) => {
  const photo = await axios.get(
    `${link}/photos/random?client_id=${key}&count=1&query=${type}`
  );
  const photoResponse = await photo;
  console.log(photoResponse);
  return photoResponse;
};

export default getImage;
