import * as selectors from '../selectors';
import { RootState } from 'types';
import { RepoErrorType } from '../types';
import { initialState } from '..';
import { RepoFileStruct } from 'types/Repo';

describe('GithubRepoInfo selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectGithubRepoInfoError(state)).toEqual(
      initialState.error,
    );
    expect(selectors.selectGithubRepoInfoLoading(state)).toEqual(
      initialState.loading,
    );
    expect(selectors.selectGithubRepoInfoRepos(state)).toEqual(
      initialState.repo,
    );
  });

  it('should select username', () => {
    const repo = {
      readMe: 'test read me',
      sha: 'test_sha',
      url: 'test_url',
      tree: [
        {
          path: '.gitignore',
          mode: '100644',
          type: 'blob',
          sha: '66fd13c903cac02eb9657cd53fb227823484401d',
          size: 269,
          url:
            'https://api.github.com/repos/adityapandey/adventofcode/git/blobs/66fd13c903cac02eb9657cd53fb227823484401d',
        },
      ],
    } as RepoFileStruct;
    state = {
      githubRepoInfo: { ...initialState, repo: repo },
    };
    expect(selectors.selectGithubRepoInfoRepos(state)).toEqual(repo);
  });

  it('should select error', () => {
    const error = RepoErrorType.USER_NOT_FOUND;
    state = {
      githubRepoInfo: { ...initialState, error: error },
    };
    expect(selectors.selectGithubRepoInfoError(state)).toEqual(error);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      githubRepoInfo: { ...initialState, loading: loading },
    };
    expect(selectors.selectGithubRepoInfoLoading(state)).toEqual(loading);
  });
});
