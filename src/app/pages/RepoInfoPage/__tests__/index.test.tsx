import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { RepoInfoPage } from '..';

const shallowRenderer = createRenderer();

describe('<RepoInfoPage />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<RepoInfoPage />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
