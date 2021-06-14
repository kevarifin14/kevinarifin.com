import renderer from 'react-test-renderer';

import HomePage from 'pages';

describe('', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <HomePage latestNewsletterSlug="hi" />,
    );

    expect(tree).toMatchSnapshot();
  });
});
