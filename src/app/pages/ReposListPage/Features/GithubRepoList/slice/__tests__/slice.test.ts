import * as slice from '..';
import { ContainerState, RepoErrorType } from '../types';
import { Repo } from 'types/Repo';

describe('GithubRepoList slice', () => {
  let state: ContainerState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle changeRepoId', () => {
    const text = 'test';
    expect(
      slice.reducer(state, slice.githubRepoListActions.changeRepoId(text)),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      repoId: text,
    });
  });

  it('should handle loadRepos', () => {
    expect(
      slice.reducer(state, slice.githubRepoListActions.loadRepos()),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      loading: true,
      repositories: [],
      error: null,
    });
  });

  it('should handle reposLoaded', () => {
    const repos = [{ name: 'test' }] as Repo[];
    expect(
      slice.reducer(state, slice.githubRepoListActions.reposLoaded(repos)),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      loading: false,
      repositories: repos,
    });
  });

  it('should handle repoError', () => {
    const repoError = RepoErrorType.USER_NOT_FOUND;
    expect(
      slice.reducer(state, slice.githubRepoListActions.repoError(repoError)),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      error: repoError,
    });
  });
});
