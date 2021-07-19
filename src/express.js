require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

const link = 'https://api.unsplash.com';

const key = process.env.REACT_APP_API_KEY;

app.get('/cake', async (req, res) => {
  const photo = await fetch(
    `${link}/photos/random?client_id=${key}&count=1&query=cake`
  );
  const photoResponse = await photo.json();
  console.log(photoResponse);
});
