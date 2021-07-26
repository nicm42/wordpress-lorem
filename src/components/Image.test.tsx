import { render, screen } from '@testing-library/react';
import Image from './Image';
import testImage from '../test-image2.json';

describe('Image test', () => {
  it('renders without crashing', () => {
    render(<Image photo={testImage} index={1} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  it('has the correct src and alt', () => {
    render(<Image photo={testImage} index={1} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      'https://images.unsplash.com/photo-1571622840901-92ae138bd36e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDc4NTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY3NjA2NTU&ixlib=rb-1.2.1&q=80&w=200'
    );
    expect(image).toHaveAttribute(
      'alt',
      'clear glass cake with white and red strawberries'
    );
  });

  it('has the photographer information present', () => {
    render(<Image photo={testImage} index={1} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute(
      'href',
      'https://unsplash.com/@jjy95?utm_source=wordpress_lorem&utm_medium=referral'
    );
    expect(links[1]).toHaveAttribute(
      'href',
      'https://unsplash.com?utm_source=wordpress_lorem&utm_medium=referral'
    );
    const linkText1 = screen.getByText('jjy95');
    expect(linkText1).toBeInTheDocument();
    const linkText2 = screen.getByText('Unsplash');
    expect(linkText2).toBeInTheDocument();
  });
});
