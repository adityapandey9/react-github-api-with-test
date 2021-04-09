import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.githubRepoList || initialState;

export const selectRepoListLoading = createSelector(
  [selectDomain],
  githubRepoListState => githubRepoListState.loading,
);

export const selectRepoListRepoId = createSelector(
  [selectDomain],
  githubRepoListState => githubRepoListState.repoId,
);

export const selectRepoListError = createSelector(
  [selectDomain],
  githubRepoListState => githubRepoListState.error,
);

export const selectRepoListRepos = createSelector(
  [selectDomain],
  githubRepoListState => githubRepoListState.repositories,
);
