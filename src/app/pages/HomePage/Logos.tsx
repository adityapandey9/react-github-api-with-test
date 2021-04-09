import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as PlusSign } from './assets/plus-sign.svg';

export function Logos() {
  return (
    <Wrapper>
      <PlusSign className="sign" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${p => p.theme.border};

  .logo {
    width: 4.5rem;
    height: 4.5rem;
  }

  .sign {
    width: 2rem;
    height: 2rem;
    margin: 0 2rem;
  }
`;
