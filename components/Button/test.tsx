import renderer from 'react-test-renderer';

import Button from '.';

describe('Button', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Button />,
    );
    expect(tree).toMatchSnapshot();
  });
});
