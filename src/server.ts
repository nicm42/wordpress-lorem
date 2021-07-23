import express, { Request, Response } from 'express';
require('dotenv').config();

const app = express();
const port = 8000;
const fetch = require('node-fetch');

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

const link = 'https://api.unsplash.com';

const key = process.env.REACT_APP_API_KEY;

app.get('/knight', async (req: Request, res: Response) => {
  const photo = await fetch(
    `${link}/photos/random?client_id=${key}&count=1&query=knight`
  );
  const photoResponse = await photo.json();
  res.send(photoResponse);
});

app.get('/space', async (req: Request, res: Response) => {
  const photo = await fetch(
    `${link}/photos/random?client_id=${key}&count=1&query=space`
  );
  const photoResponse = await photo.json();
  res.send(photoResponse);
});

app.get('/cat', async (req: Request, res: Response) => {
  const photo = await fetch(
    `${link}/photos/random?client_id=${key}&count=1&query=cat`
  );
  const photoResponse = await photo.json();
  res.send(photoResponse);
});

app.get('/cake', async (req: Request, res: Response) => {
  const photo = await fetch(
    `${link}/photos/random?client_id=${key}&count=1&query=cake`
  );
  const photoResponse = await photo.json();
  res.send(photoResponse);
});

// So TypeScript is happy about the dotenv config
export {};
