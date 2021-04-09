/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { RepoListPage } from './pages/ReposListPage/Loadable';
import { RepoInfoPage } from './pages/RepoInfoPage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { INDEX_PATH, REPO_INFO_PATH, REPO_LIST_PATH } from './path';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + INDEX_PATH}
          component={HomePage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + REPO_LIST_PATH}
          component={RepoListPage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + REPO_INFO_PATH}
          component={RepoInfoPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
