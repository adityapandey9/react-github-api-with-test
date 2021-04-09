import * as slice from '..';
import { ContainerState, RepoErrorType } from '../types';
import { RepoFileStruct } from 'types/Repo';

describe('GithubRepoInfo slice', () => {
  let state: ContainerState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle loadRepoById', () => {
    expect(
      slice.reducer(state, slice.githubRepoInfoActions.loadRepoById()),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      loading: true,
      repo: null,
      error: null,
    });
  });

  it('should handle reposLoaded', () => {
    const repos = {
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
    expect(
      slice.reducer(state, slice.githubRepoInfoActions.reposLoaded(repos)),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      loading: false,
      repo: repos,
    });
  });

  it('should handle repoError', () => {
    const repoError = RepoErrorType.USER_NOT_FOUND;
    expect(
      slice.reducer(state, slice.githubRepoInfoActions.repoError(repoError)),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      error: repoError,
    });
  });
});
