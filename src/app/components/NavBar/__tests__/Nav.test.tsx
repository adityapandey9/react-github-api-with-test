import * as React from 'react';
import { render } from '@testing-library/react';
import { Nav } from '../Nav';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../../styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { configureAppStore } from '../../../../store/configureStore';

const renderNav = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Switch>
              <Nav />
            </Switch>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>,
  );

describe('<Nav />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderNav>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderNav(store);
  });
  afterEach(() => {
    component.unmount();
  });

  it('should match the snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
