import * as React from 'react';
import styled from 'styled-components/macro';
import { LanguageSwitch } from '../LanguageSwitch';
import { ThemeSwitch } from '../ThemeSwitch';

export function Nav() {
  return (
    <Wrapper>
      <LanguageSwitch />
      <ThemeSwitch />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;
