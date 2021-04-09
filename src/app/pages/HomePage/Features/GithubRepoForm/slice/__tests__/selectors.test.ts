import * as selectors from '../selectors';
import { RootState } from 'types';
import { initialState } from '..';

describe('GithubRepoForm selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectUsername(state)).toEqual(initialState.username);
  });

  it('should select username', () => {
    const username = 'test';
    state = {
      githubRepoForm: { ...initialState, username: username },
    };
    expect(selectors.selectUsername(state)).toEqual(username);
  });
});
