import renderer from 'react-test-renderer';

import Layout from '.';

describe('Layout', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Layout />,
    );
    expect(tree).toMatchSnapshot();
  });
});
