import renderer from 'react-test-renderer';

import Post from '.';

describe('Post', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Post />,
    );
    expect(tree).toMatchSnapshot();
  });
});
