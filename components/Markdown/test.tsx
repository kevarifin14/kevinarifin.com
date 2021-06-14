import renderer from 'react-test-renderer';

import Markdown from '.';

describe('Markdown', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <Markdown />,
    );
    expect(tree).toMatchSnapshot();
  });
});
