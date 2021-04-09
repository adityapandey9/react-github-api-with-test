import * as React from 'react';
import { NotFoundPage } from '..';
import { BrowserRouter, Switch } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import renderer from 'react-test-renderer';
import { Link } from 'app/components/Link';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { configureAppStore } from '../../../../store/configureStore';
import { ThemeProvider } from '../../../../styles/theme/ThemeProvider';

const renderPage = (store: Store) =>
  renderer.create(
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Switch>
              <NotFoundPage />
            </Switch>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>,
  );

describe('<NotFoundPage />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderPage>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderPage(store);
  });
  afterEach(() => {
    component.unmount();
  });

  it('should match snapshot', () => {
    component = renderPage(store);
    expect(component).toMatchSnapshot();
  });

  it('should should contain Link', () => {
    component = renderPage(store);
    expect(component.root.findByType(Link)).toBeDefined();
  });
});
