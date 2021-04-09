import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import { useSelector } from 'react-redux';
import { selectUsername } from '../HomePage/Features/GithubRepoForm/slice/selectors';

export function RepoListPage() {
  const username = useSelector(selectUsername);

  return (
    <>
      <Helmet>
        <title>{username} Repo Page</title>
        <meta name="description" content="Search using Github Username" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Features />
      </PageWrapper>
    </>
  );
}
