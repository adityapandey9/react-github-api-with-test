import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.githubRepoInfo || initialState;

export const selectGithubRepoInfoLoading = createSelector(
  [selectDomain],
  githubRepoInfoState => githubRepoInfoState.loading,
);

export const selectGithubRepoInfoError = createSelector(
  [selectDomain],
  githubRepoInfoState => githubRepoInfoState.error,
);

export const selectGithubRepoInfoRepos = createSelector(
  [selectDomain],
  githubRepoInfoState => githubRepoInfoState.repo,
);
