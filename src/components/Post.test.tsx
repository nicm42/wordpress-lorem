import { render, screen } from '@testing-library/react';
import BlogPost from './Post';
import testPost from '../test-post.json';

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
