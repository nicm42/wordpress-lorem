import { render, screen, cleanup, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import BlogPost from './Post';
import testPost1 from '../dummyData/test-post1.json';
import testPost2 from '../dummyData/test-post2.json';
import testPost3 from '../dummyData/test-post3.json';
import testPost4 from '../dummyData/test-post4.json';
import testImage from '../dummyData/test-image.json';

describe('Post test', () => {
  it('has the title and content', async () => {
    render(<BlogPost post={testPost1} index={1} />);
    const Title = await waitFor(() =>
      screen.getByText('Monty Python and the Holy Grail Fillerama')
    );
    expect(Title).toBeInTheDocument();
    const Content = await waitFor(() =>
      screen.getByText(
        'No, no, no! Yes, yes. A bit. But she’s got a wart. Knights of Ni, we are but simple travelers who seek the enchanter who lives beyond these woods. We shall say ‘Ni’ again to you, if you do not appease us.',
        { exact: false }
      )
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
    render(<BlogPost post={testPost1} index={1} />);
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

  it('gets data from the API for post 2', async () => {
    mockedAxios.get.mockResolvedValueOnce(testImage);
    render(<BlogPost post={testPost2} index={1} />);
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledWith('/space'));
  });

  it('gets data from the API for post 3', async () => {
    mockedAxios.get.mockResolvedValueOnce(testImage);
    render(<BlogPost post={testPost3} index={3} />);
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledWith('/cat'));
  });

  it('gets data from the API for post 4', async () => {
    mockedAxios.get.mockResolvedValueOnce(testImage);
    render(<BlogPost post={testPost4} index={3} />);
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledWith('/cake'));
  });

  it('gets an error from the API', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      response: {
        status: 400,
        statusText: 'Bad API',
      },
      data: [{}],
    });
    render(<BlogPost post={testPost1} index={1} />);
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith('/knight')
    );
    const image = await waitFor(() => screen.queryByRole('img'));
    expect(image).not.toBeInTheDocument();
  });
});

describe('Snapshot test', () => {
  const getImages = jest.fn();

  it('matches post snapshot', async () => {
    const tree = renderer
      .create(<BlogPost post={testPost1} index={0} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
