import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as StarIcon } from './assets/star.svg';
import { ReactComponent as NewWindowIcon } from './assets/new-window.svg';
import { A } from 'app/components/A';

interface Props {
  name: string;
  starCount: number;
  url: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function RepoItem({ name, starCount, url, onClick }: Props) {
  return (
    <Wrapper>
      <Name onClick={onClick}>{name}</Name>
      <Info>
        <StarCount>
          <StarIcon />
          {starCount}
        </StarCount>
        <A href={url} target="_blank" rel="noopener noreferrer">
          <NewWindowIcon />
        </A>
      </Info>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  min-height: 2.75rem;
  font-weight: 500;
  color: ${p => p.theme.text};

  &:nth-child(odd) {
    background-color: ${p => p.theme.backgroundVariant};
  }
`;

const Name = styled.div`
  flex: 1;
  padding: 0.625rem 0;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const Info = styled.div`
  display: flex;
`;

const StarCount = styled.div`
  display: flex;
  align-items: center;
  min-width: 6rem;
  .icon {
    margin-right: 0.125rem;
  }
`;
