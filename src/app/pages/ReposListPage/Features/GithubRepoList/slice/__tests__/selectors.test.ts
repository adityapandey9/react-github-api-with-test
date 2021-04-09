import * as selectors from '../selectors';
import { RootState } from 'types';
import { RepoErrorType } from '../types';
import { initialState } from '..';
import { Repo } from 'types/Repo';

describe('GithubRepoList selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectRepoListRepoId(state)).toEqual(initialState.repoId);
  });

  it('should select repoId', () => {
    const repoId = 'test';
    state = {
      githubRepoList: { ...initialState, repoId: repoId },
    };
    expect(selectors.selectRepoListRepoId(state)).toEqual(repoId);
  });

  it('should select repo', () => {
    const repo = { name: 'test' } as Repo;
    state = {
      githubRepoList: { ...initialState, repositories: [repo] },
    };
    expect(selectors.selectRepoListRepos(state)).toEqual([repo]);
  });

  it('should select error', () => {
    const error = RepoErrorType.USER_NOT_FOUND;
    state = {
      githubRepoList: { ...initialState, error: error },
    };
    expect(selectors.selectRepoListError(state)).toEqual(error);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      githubRepoList: { ...initialState, loading: loading },
    };
    expect(selectors.selectRepoListLoading(state)).toEqual(loading);
  });
});
