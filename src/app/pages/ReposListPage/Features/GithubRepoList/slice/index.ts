import { PayloadAction } from '@reduxjs/toolkit';
import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { githubRepoListSaga } from './saga';
import { GithubRepoListState, RepoErrorType } from './types';

export const initialState: GithubRepoListState = {
  repositories: [],
  loading: false,
  error: null,
  repoId: 'rethinkdb-adapter',
};

const slice = createSlice({
  name: 'githubRepoList',
  initialState,
  reducers: {
    changeRepoId(state, action: PayloadAction<string>) {
      state.repoId = action.payload;
    },
    loadRepos(state) {
      state.loading = true;
      state.error = null;
      state.repositories = [];
    },
    reposLoaded(state, action: PayloadAction<Repo[]>) {
      state.repositories = action.payload;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<RepoErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: githubRepoListActions, reducer } = slice;

export const useGithubRepoListSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: githubRepoListSaga });
  return { actions: slice.actions };
};
