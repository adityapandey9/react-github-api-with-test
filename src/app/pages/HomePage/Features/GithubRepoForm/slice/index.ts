import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { GithubRepoFormState } from './types';

export const initialState: GithubRepoFormState = {
  username: 'adityapandey9',
};

const slice = createSlice({
  name: 'githubRepoForm',
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});

export const { actions: githubRepoFormActions, reducer } = slice;

export const useGithubRepoFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
