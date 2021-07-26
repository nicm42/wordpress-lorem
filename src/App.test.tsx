import { render, screen, cleanup, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import testPost from './dummy-posts2.json';

describe('App tests', () => {
  it('renders without crashing', () => {
    render(<App />);
    const header = screen.getByText('Alternative Ipsum Posts');
    expect(header).toBeInTheDocument();
  });
});

describe('Post API test', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  /* afterEach(() => {
    jest.clearAllMocks();
  }); */
  beforeEach(() => jest.resetAllMocks());
  afterEach(cleanup);

  it('gets data from the API', async () => {
    mockedAxios.get.mockResolvedValueOnce(testPost);
    render(<App />);
    //await waitFor(() => screen.debug());
    let loadingDiv = screen.queryByTestId('loading');
    expect(loadingDiv).toBeInTheDocument();
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://public-api.wordpress.com/rest/v1.1/sites/nictesting935058505.wordpress.com/posts/?pretty=true'
      )
    );
    const Title = await waitFor(() => screen.getByText('This is a test post'));
    expect(Title).toBeInTheDocument();
    loadingDiv = await waitFor(() => screen.queryByTestId('loading'));
    expect(loadingDiv).not.toBeInTheDocument();
  });

  it('gets an error from the API', async () => {
    mockedAxios.get.mockResolvedValueOnce('error');
    render(<App />);
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://public-api.wordpress.com/rest/v1.1/sites/nictesting935058505.wordpress.com/posts/?pretty=true'
      )
    );
    const Error = await waitFor(() => screen.getByText("Couldn't fetch posts"));
    expect(Error).toBeInTheDocument();
  });
});
