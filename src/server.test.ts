import { Request, Response } from 'express';
const app = require('./server');
const request = require('supertest');

describe('routes work', () => {
  it.only('tests knight route works', async (done) => {
    app.get('/knight', (req: Request, res: Response) => {
      res.send('knight photo');
    });
    return request(app).get('/knight').expect('knight photo').expect(200);
    /* const response = await request.get('knight');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('pass!');
    done(); */
    /* const response = await request(app).get('/');
    expect(response.statusCode).toBe(404); */
  });

  it('tests space route works', (done) => {
    app.get('/space', (req: Request, res: Response) => {
      res.send('space photo');
    });
    request(app).get('/space').expect('space photo').expect(200, done);
  });

  it('tests cat route works', (done) => {
    app.get('/cat', (req: Request, res: Response) => {
      res.send('cat photo');
    });
    request(app).get('/cat').expect('cat photo').expect(200, done);
  });

  it('tests cake route works', (done) => {
    app.get('/cake', (req: Request, res: Response) => {
      res.send('cake photo');
    });
    request(app).get('/cake').expect('cake photo').expect(200, done);
  });
});

// To make this a module to make the test happy
export {};
