import { render, screen, cleanup, waitFor } from '@testing-library/react';
import axios from 'axios';
import BlogPost from './Post';
import testPost from '../test-post.json';
import testImage from '../test-image.json';

describe('Post test', () => {
  it('has the title and content', () => {
    render(<BlogPost post={testPost} index={1} />);
    const Title = screen.getByText('Monty Python and the Holy Grail Fillerama');
    expect(Title).toBeInTheDocument();
    const Content = screen.getByText(
      'No, no, no! Yes, yes. A bit. But she’s got a wart. Knights of Ni, we are but simple travelers who seek the enchanter who lives beyond these woods. We shall say ‘Ni’ again to you, if you do not appease us.',
      { exact: false }
    );
    expect(Content).toBeInTheDocument();
  });
});

describe('Image API test', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => jest.resetAllMocks());
  afterEach(cleanup);

  it('gets data from the API', async () => {
    mockedAxios.get.mockResolvedValueOnce(testImage);
    render(<BlogPost post={testPost} index={1} />);
    let loadingDiv = screen.queryByTestId('loading');
    expect(loadingDiv).toBeInTheDocument();
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith('/knight')
    );
    const image = await waitFor(() => screen.getByRole('img'));
    expect(image).toHaveAttribute(
      'src',
      'https://images.unsplash.com/photo-1571622840901-92ae138bd36e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDc4NTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY3NjA2NTU&ixlib=rb-1.2.1&q=80&w=200'
    );
    loadingDiv = await waitFor(() => screen.queryByTestId('loading'));
    expect(loadingDiv).not.toBeInTheDocument();
  });

  it('gets an error from the API', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      response: {
        status: 400,
        statusText: 'Bad API',
      },
      data: [{}],
    });
    render(<BlogPost post={testPost} index={1} />);
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith('/knight')
    );
    const image = await waitFor(() => screen.queryByRole('img'));
    expect(image).not.toBeInTheDocument();
  });
});
