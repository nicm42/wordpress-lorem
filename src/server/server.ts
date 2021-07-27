import express, { Request, Response } from 'express';
import axios from 'axios';
require('dotenv').config();

require('dotenv').config();

const link = 'https://api.unsplash.com';
const key = process.env.REACT_APP_API_KEY;

const app = express();
const port = process.env.PORT || 8000;

module.exports = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.get('/knight', async (req: Request, res: Response) => {
  const photo = await axios.get(
    `${link}/photos/random?client_id=${key}&count=1&query=knight`
  );
  const photoResponse = await photo;
  console.log(photoResponse);
  res.send(photoResponse.data);
});

app.get('/space', async (req: Request, res: Response) => {
  const photo = await axios.get(
    `${link}/photos/random?client_id=${key}&count=1&query=space`
  );
  const photoResponse = await photo;
  //console.log(photoResponse);
  res.send(photoResponse.data);
});

app.get('/cat', async (req: Request, res: Response) => {
  const photo = await axios.get(
    `${link}/photos/random?client_id=${key}&count=1&query=cat`
  );
  const photoResponse = await photo;
  //console.log(photoResponse);
  res.send(photoResponse.data);
});

app.get('/cake', async (req: Request, res: Response) => {
  const photo = await axios.get(
    `${link}/photos/random?client_id=${key}&count=1&query=cake`
  );
  const photoResponse = await photo;
  //console.log(photoResponse);
  res.send(photoResponse.data);
});

//module.exports = app;
//export {};
