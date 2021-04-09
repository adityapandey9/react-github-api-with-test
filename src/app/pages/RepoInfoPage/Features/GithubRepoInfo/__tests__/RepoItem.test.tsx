import * as React from 'react';
import { render } from '@testing-library/react';
import { RepoItem } from '../RepoItem';
import { formatFileSize } from '../../../../../../utils/func';

const renderRepoItem = (props: Parameters<typeof RepoItem>[number]) =>
  render(<RepoItem {...props} />);

describe('RepoInfo <RepoItem />', () => {
  it('should match the snapshot', () => {
    const repoItem = renderRepoItem({
      name: 'test',
      fileSize: 1,
      url: 'testUrl',
    });
    expect(repoItem.container.firstChild).toMatchSnapshot();
  });

  it('should have url in <a> child', () => {
    const url = 'url1';
    const repoItem = renderRepoItem({
      name: 'test',
      fileSize: 1,
      url: url,
    });
    expect(repoItem.container.querySelector('a')).toHaveAttribute('href', url);
  });

  it('should have props displayed', () => {
    const url = 'url1';
    const fileSize = 3873;
    const name = 'test';
    const repoItem = renderRepoItem({
      name: name,
      fileSize: fileSize,
      url: url,
    });
    expect(repoItem.queryByText(name)).toBeInTheDocument();
    expect(repoItem.queryByText(formatFileSize(fileSize))).toBeInTheDocument();
  });

  it('should have props with 0 filesize displayed', () => {
    const url = 'url1';
    const fileSize = 0;
    const name = 'test';
    const repoItem = renderRepoItem({
      name: name,
      fileSize: fileSize,
      url: url,
    });
    expect(repoItem.queryByText(formatFileSize(fileSize))).toBeInTheDocument();
  });
});
