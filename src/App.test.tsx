import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import axios from 'axios';
import App from './App';
import testPost from './dummyData/dummy-posts2.json';

describe('App tests', () => {
  it('renders without crashing', async () => {
    render(<App />);
    const header = await waitFor(() =>
      screen.getByText('Alternative Ipsum Posts')
    );
    expect(header).toBeInTheDocument();
  });
});

describe('Post API test', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;

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
    let Toast = await waitFor(() => screen.queryByText('Posts loaded!'));
    expect(Toast).toBeInTheDocument();
    const toastButton = await waitFor(() =>
      screen.queryByRole('button', {
        name: /Close/i,
      })
    );
    fireEvent.click(toastButton);
    Toast = await waitFor(() => screen.queryByText('Posts loaded!'));
    expect(Toast).not.toBeInTheDocument();
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
