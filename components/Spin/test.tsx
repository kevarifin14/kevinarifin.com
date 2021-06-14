import renderer from 'react-test-renderer';

import Spin from '.';

describe('Spin', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Spin />,
    );
    expect(tree).toMatchSnapshot();
  });
});
