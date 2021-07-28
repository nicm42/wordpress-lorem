import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Loading from './Loading';

describe('Loading spinner test', () => {
  it('renders without crashing', () => {
    render(<Loading />);
    const loadingDiv = screen.getByTestId('loading');
    expect(loadingDiv).toBeInTheDocument();
  });
});

describe('Snapshot test', () => {
  it('matches loading snapshot', () => {
    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
