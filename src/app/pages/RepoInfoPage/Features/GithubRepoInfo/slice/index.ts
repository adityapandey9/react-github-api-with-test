import { PayloadAction } from '@reduxjs/toolkit';
import { RepoFileStruct } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { githubRepoInfoSaga } from './saga';
import { GithubRepoInfoState, RepoErrorType } from './types';

export const initialState: GithubRepoInfoState = {
  repo: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'githubRepoInfo',
  initialState,
  reducers: {
    loadRepoById(state) {
      state.loading = true;
      state.error = null;
      state.repo = null;
    },
    reposLoaded(state, action: PayloadAction<RepoFileStruct | null>) {
      state.repo = action.payload;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<RepoErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: githubRepoInfoActions, reducer } = slice;

export const useGithubRepoInfoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: githubRepoInfoSaga });
  return { actions: slice.actions };
};
