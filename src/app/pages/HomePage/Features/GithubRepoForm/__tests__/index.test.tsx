import * as React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { GithubRepoForm } from '..';
import { configureAppStore } from 'store/configureStore';
import { initialState } from '../slice';
import { BrowserRouter, Switch } from 'react-router-dom';

const renderGithubRepoForm = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Switch>
              <GithubRepoForm />
            </Switch>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>,
  );

describe('<GithubRepoForm />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderGithubRepoForm>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderGithubRepoForm(store);
    expect(store.getState().githubRepoForm).toEqual(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  it("checking if username isn't empty", () => {
    component.unmount();
    component = renderGithubRepoForm(store);
    expect(initialState.username.length).toBeGreaterThan(0);
  });

  it('should dispatch action on username change', () => {
    const input = component.container.querySelector('input');
    fireEvent.change(input!, { target: { value: 'test' } });
    expect(store.getState().githubRepoForm.username).toBe('test');
  });

  it('should change username field value on action', () => {
    const value = 'test';
    const form = renderGithubRepoForm(store);

    const input = form.container.querySelector('input');
    fireEvent.change(input!, { target: { value: value } });

    expect(form.container.querySelector('input')?.value).toBe(value);
  });
});
