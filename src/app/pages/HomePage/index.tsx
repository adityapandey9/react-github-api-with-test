import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Masthead } from './Masthead';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Github User Name Search Page</title>
        <meta name="description" content="Search using Github Username" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Masthead />
        <Features />
      </PageWrapper>
    </>
  );
}
