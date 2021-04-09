import * as slice from '..';
import { ContainerState } from '../types';

describe('GithubRepoForm slice', () => {
  let state: ContainerState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle changeUsername', () => {
    const text = 'test';
    expect(
      slice.reducer(state, slice.githubRepoFormActions.changeUsername(text)),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      username: text,
    });
  });
});
