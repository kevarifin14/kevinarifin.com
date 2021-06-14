import renderer from 'react-test-renderer';

import Navbar from '.';

describe('Navbar', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Navbar />);
    expect(tree).toMatchSnapshot();
  });
});
