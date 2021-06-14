import renderer from 'react-test-renderer';

import Input from '.';

describe('Input', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Input />,
    );
    expect(tree).toMatchSnapshot();
  });
});
