import * as React from 'react';
import styled from 'styled-components/macro';
import { Logos } from './Logos';
import { Title } from './components/Title';

export function Masthead() {
  return (
    <Wrapper>
      <Logos />
      <Title>Github User Search</Title>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 260px;
`;
