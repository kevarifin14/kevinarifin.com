import renderer from 'react-test-renderer';

import Notification from '.';

describe('Notification', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Notification />,
    );
    expect(tree).toMatchSnapshot();
  });
});
