import * as React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { GithubRepoInfo, repoErrorText } from '..';
import { configureAppStore } from 'store/configureStore';
import { githubRepoInfoActions as actions, initialState } from '../slice';
import {
  githubRepoListActions,
  initialState as repoListState,
} from '../../../../ReposListPage/Features/GithubRepoList/slice';
import {
  githubRepoFormActions,
  initialState as searchPageState,
} from '../../../../HomePage/Features/GithubRepoForm/slice';
import { RepoErrorType } from '../slice/types';
import { BrowserRouter, Switch } from 'react-router-dom';

function* mockGithubRepoFormSaga() {}

jest.mock('../slice/saga', () => ({
  githubRepoInfoSaga: mockGithubRepoFormSaga,
}));

const renderGithubRepoForm = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Switch>
              <GithubRepoInfo />
            </Switch>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>,
  );

describe('<GithubRepoInfo />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderGithubRepoForm>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderGithubRepoForm(store);
    store.dispatch(actions.reposLoaded(null));
    expect(store.getState().githubRepoInfo).toEqual(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  it("should fetch repos on mount if username isn't empty", () => {
    component.unmount();
    component = renderGithubRepoForm(store);
    expect(repoListState.repoId.length).toBeGreaterThan(0);
    expect(searchPageState.username.length).toBeGreaterThan(0);
    expect(store.getState().githubRepoInfo.loading).toBe(true);
  });

  it("shouldn't fetch repos on mount if username is empty", () => {
    store.dispatch(githubRepoFormActions.changeUsername(''));
    component.unmount();
    component = renderGithubRepoForm(store);
    store.dispatch(actions.reposLoaded(null));
    expect(store.getState().githubRepoForm.username.length).toBe(0);
    expect(store.getState().githubRepoInfo.loading).toBe(false);
  });

  it("shouldn't fetch repos on mount if repoId is empty", () => {
    store.dispatch(githubRepoListActions.changeRepoId(''));
    component.unmount();
    component = renderGithubRepoForm(store);
    store.dispatch(actions.reposLoaded(null));
    expect(store.getState().githubRepoList.repoId.length).toBe(0);
    expect(store.getState().githubRepoInfo.loading).toBe(false);
  });

  it('should dispatch action on username change', () => {
    component.unmount();
    component = renderGithubRepoForm(store);
    store.dispatch(githubRepoFormActions.changeUsername('adityapandey'));
    expect(store.getState().githubRepoInfo.loading).toBe(true);
  });

  it('should dispatch action on repoId change', () => {
    component.unmount();
    component = renderGithubRepoForm(store);
    store.dispatch(
      githubRepoListActions.changeRepoId('geofencing-app-in-react-native'),
    );
    expect(store.getState().githubRepoInfo.loading).toBe(true);
  });

  it('should display loading indicator when state is loading', () => {
    store.dispatch(actions.loadRepoById());
    expect(component.container.querySelector('circle')).toBeInTheDocument();
  });

  it('should display list when repos not empty', () => {
    const repoName = 'testRepo';
    store.dispatch(
      actions.reposLoaded({
        readMe: '## Here some text',
        sha: 'test_sha',
        url: 'url',
        tree: [
          {
            path: repoName,
            type: 'test_type',
            url: 'url',
            mode: 'test_mode',
            sha: 'test_sha1',
          },
        ],
      }),
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
