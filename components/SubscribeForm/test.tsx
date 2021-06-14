import renderer from 'react-test-renderer';

import SubscribeForm from '.';

describe('SubscribeForm', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <SubscribeForm />,
    );
    expect(tree).toMatchSnapshot();
  });
});
