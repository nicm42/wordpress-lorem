import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading spinner test', () => {
  it('renders without crashing', () => {
    render(<Loading />);
    const loadingDiv = screen.getByTestId('loading');
    expect(loadingDiv).toBeInTheDocument();
  });
});
