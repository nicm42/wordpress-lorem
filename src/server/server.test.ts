import axios from 'axios';

const app = require('./server');
const request = require('supertest');

describe('routes work', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => jest.resetAllMocks());

  it('tests knight route works', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: 'knight photo' });
    return request(app).get('/knight').expect('knight photo').expect(200);
  });

  it('tests space route works', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: 'space photo' });
    return request(app).get('/space').expect('space photo').expect(200);
  });

  it('tests cat route works', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: 'cat photo' });
    return request(app).get('/cat').expect('cat photo').expect(200);
  });

  it('tests cake route works', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: 'cake photo' });
    return request(app).get('/cake').expect('cake photo').expect(200);
  });
});

// To make this a module to make the test happy
export {};
