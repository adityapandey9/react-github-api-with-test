import * as React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { GithubRepoList, repoErrorText } from '..';
import { configureAppStore } from 'store/configureStore';
import { githubRepoListActions as actions, initialState } from '../slice';
import {
  githubRepoFormActions,
  initialState as RepoFormState,
} from '../../../../HomePage/Features/GithubRepoForm/slice';
import { RepoErrorType } from '../slice/types';
import { BrowserRouter, Switch } from 'react-router-dom';

function* mockGithubRepoListSaga() {}

jest.mock('../slice/saga', () => ({
  githubRepoListSaga: mockGithubRepoListSaga,
}));

const renderGithubRepoList = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Switch>
              <GithubRepoList />
            </Switch>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>,
  );

describe('<GithubRepoList />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderGithubRepoList>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderGithubRepoList(store);
    store.dispatch(actions.reposLoaded([]));
    expect(store.getState().githubRepoList).toEqual(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  it("should fetch repos on mount if username isn't empty", () => {
    component.unmount();
    component = renderGithubRepoList(store);
    expect(RepoFormState.username.length).toBeGreaterThan(0);
    expect(store.getState().githubRepoList.loading).toBe(true);
  });

  it("shouldn't fetch repos on mount if username is empty", () => {
    store.dispatch(githubRepoFormActions.changeUsername(''));
    component.unmount();
    component = renderGithubRepoList(store);
    store.dispatch(actions.reposLoaded([]));
    expect(store.getState().githubRepoForm.username.length).toBe(0);
    expect(store.getState().githubRepoList.loading).toBe(false);
  });

  it('should dispatch action on username change', () => {
    store.dispatch(githubRepoFormActions.changeUsername('adityapandey'));
    component.unmount();
    component = renderGithubRepoList(store);
    expect(store.getState().githubRepoList.loading).toBe(true);
  });

  it('should display loading indicator when state is loading', () => {
    store.dispatch(actions.loadRepos());
    expect(component.container.querySelector('circle')).toBeInTheDocument();
  });

  it('should display list when repos not empty', () => {
    const repoName = 'testRepo';
    store.dispatch(
      actions.reposLoaded([{ id: 'test', name: repoName } as any]),
    );
    expect(component.queryByText(repoName)).toBeInTheDocument();
  });

  it('should display error when repoError fired', () => {
    let error = RepoErrorType.USER_NOT_FOUND;
    store.dispatch(actions.repoError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = RepoErrorType.USER_HAS_NO_REPO;
    store.dispatch(actions.repoError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = RepoErrorType.USERNAME_EMPTY;
    store.dispatch(actions.repoError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = RepoErrorType.RESPONSE_ERROR;
    store.dispatch(actions.repoError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();

    error = RepoErrorType.GITHUB_RATE_LIMIT;
    store.dispatch(actions.repoError(error));
    expect(component.queryByText(repoErrorText(error))).toBeInTheDocument();
  });
});
