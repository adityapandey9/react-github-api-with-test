import * as React from 'react';

import { RepoListPage } from '..';
import { ThemeProvider } from '../../../../styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureAppStore } from '../../../../store/configureStore';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

const renderRepoListPage = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Switch>
              <RepoListPage />
            </Switch>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>,
  );

describe('RepoList <RepoListPage />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderRepoListPage>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderRepoListPage(store);
  });
  afterEach(() => {
    component.unmount();
  });

  it('should render and match the snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
