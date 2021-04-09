import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';

export function RepoInfoPage() {
  return (
    <>
      <Helmet>
        <title>User Name Repo Page</title>
        <meta name="description" content="Search using Github Username" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Features />
      </PageWrapper>
    </>
  );
}
