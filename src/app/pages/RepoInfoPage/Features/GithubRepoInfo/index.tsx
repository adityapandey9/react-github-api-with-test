import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { TextButton } from './components/TextButton';
import {
  selectGithubRepoInfoError,
  selectGithubRepoInfoRepos,
  selectGithubRepoInfoLoading,
} from './slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { RepoErrorType } from './slice/types';
import { useGithubRepoInfoSlice } from './slice';
import { useRepoIdChange } from './slice/hook';
import { RepoItem } from './RepoItem';
import { useUserNameChange } from '../../../ReposListPage/Features/GithubRepoList/slice/hook';
import { selectUsername } from '../../../HomePage/Features/GithubRepoForm/slice/selectors';
import { selectRepoListRepoId } from '../../../ReposListPage/Features/GithubRepoList/slice/selectors';

export function GithubRepoInfo() {
  const { actions } = useGithubRepoInfoSlice();
  useUserNameChange();
  useRepoIdChange();

  const username = useSelector(selectUsername);
  const repoId = useSelector(selectRepoListRepoId);
  const repoInfo = useSelector(selectGithubRepoInfoRepos);
  const isLoading = useSelector(selectGithubRepoInfoLoading);
  const error = useSelector(selectGithubRepoInfoError);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.loadRepoById());
  }, [username, repoId, dispatch, actions]);

  return (
    <Wrapper>
      {isLoading && <LoadingIndicator small />}
      {repoInfo?.tree && repoInfo?.tree.length > 0 ? (
        <InfoContainer>
          <List>
            {repoInfo.tree.map(repo => (
              <RepoItem
                key={repo.sha}
                name={repo.path}
                fileSize={repo.size}
                url={repo.url}
              />
            ))}
          </List>
          <ReactMarkdown className="markDown">
            {repoInfo.readMe !== '' && repoInfo.readMe
              ? repoInfo.readMe
              : '## Sorry, no README.md file exists.'}
          </ReactMarkdown>
        </InfoContainer>
      ) : error ? (
        <ErrorText>{repoErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
}

export const repoErrorText = (error: RepoErrorType) => {
  switch (error) {
    case RepoErrorType.USER_NOT_FOUND:
      return 'There is no such repo 😞';
    case RepoErrorType.USERNAME_EMPTY:
      return 'Type any Github repo or username';
    case RepoErrorType.USER_HAS_NO_REPO:
      return 'User has no repository 🥺';
    case RepoErrorType.GITHUB_RATE_LIMIT:
      return 'Looks like github api`s rate limit(60 request/h) has exceeded 🤔';
    default:
      return 'An error has occurred!';
  }
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;

  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
  .markDown {
    color: ${p => p.theme.text} !important;
    padding: 15px;
    margin-top: 15px;
    border: 2px solid ${p => p.theme.border};
    border-radius: 8px;

    & > pre {
      background: ${p => p.theme.text};
      color: ${p => p.theme.backgroundVariant};
    }
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const List = styled.div``;

const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
