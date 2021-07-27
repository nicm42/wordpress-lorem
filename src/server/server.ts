import getImage from './getImage';

import express, { Request, Response } from 'express';
//import axios from 'axios';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
//const fetch = require('node-fetch');

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

/* const link = 'https://api.unsplash.com';
const key = process.env.REACT_APP_API_KEY; */

app.get('/knight', async (req: Request, res: Response) => {
  const photoResponse = await getImage('knight');
  console.log(photoResponse);
  res.send(photoResponse);
});

app.get('/space', async (req: Request, res: Response) => {
  const photoResponse = await getImage('space');
  console.log(photoResponse);
  res.send(photoResponse);
});

app.get('/cat', async (req: Request, res: Response) => {
  const photoResponse = await getImage('cat');
  console.log(photoResponse);
  res.send(photoResponse);
});

app.get('/cake', async (req: Request, res: Response) => {
  const photoResponse = await getImage('cake');
  console.log(photoResponse);
  res.send(photoResponse);
});

/* app.get('/knight', async (req: Request, res: Response) => {
  const photo = await axios.get(
    `${link}/photos/random?client_id=${key}&count=1&query=knight`
  );
  const photoResponse = await photo;
  console.log(photoResponse);
  res.send(photoResponse);
});

app.get('/space', async (req: Request, res: Response) => {
  const photo = await axios.get(
    `${link}/photos/random?client_id=${key}&count=1&query=space`
  );
  const photoResponse = await photo;
  res.send(photoResponse);
});

app.get('/cat', async (req: Request, res: Response) => {
  const photo = await axios.get(
    `${link}/photos/random?client_id=${key}&count=1&query=cat`
  );
  const photoResponse = await photo;
  res.send(photoResponse);
});

app.get('/cake', async (req: Request, res: Response) => {
  const photo = await axios.get(
    `${link}/photos/random?client_id=${key}&count=1&query=cake`
  );
  const photoResponse = await photo;
  res.send(photoResponse);
}); */

module.exports = app;
