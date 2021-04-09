import * as React from 'react';
import { Features } from '../Features';
import i18next from 'i18next';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../../styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Switch } from 'react-router-dom';
import { configureAppStore } from '../../../../store/configureStore';
import TestRenderer from 'react-test-renderer';

const { act } = TestRenderer;

const renderFeature = (store: Store) =>
  TestRenderer.create(
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Switch>
              <Features />
            </Switch>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>,
  );

describe('HomePage <Features />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderFeature>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderFeature(store);
  });
  afterEach(() => {
    component.unmount();
  });

  it('should render with en translations', () => {
    component = renderFeature(store);
    act(() => {
      /* fire events that update state */
      i18next.changeLanguage('en');
    });
    expect(component).toMatchSnapshot();
  });

  it('should render with de translations', () => {
    component = renderFeature(store);
    act(() => {
      /* fire events that update state */
      i18next.changeLanguage('de');
    });
    expect(component).toMatchSnapshot();
  });

  it('should render different after language change', () => {
    const renderedOutput1 = renderFeature(store);
    act(() => {
      /* fire events that update state */
      i18next.changeLanguage('de');
    });

    const renderedOutput2 = renderFeature(store);
    act(() => {
      /* fire events that update state */
      i18next.changeLanguage('en');
    });

    expect(renderedOutput1).not.toEqual(renderedOutput2);
  });
});
