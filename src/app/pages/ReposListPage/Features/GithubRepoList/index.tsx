import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { RepoItem } from './RepoItem';
import { TextButton } from './components/TextButton';
import {
  selectRepoListError,
  selectRepoListLoading,
  selectRepoListRepos,
} from './slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { RepoErrorType } from './slice/types';
import { useGithubRepoListSlice } from './slice';
import { selectUsername } from '../../../HomePage/Features/GithubRepoForm/slice/selectors';
import { useUserNameChange } from './slice/hook';
import { useHistory } from 'react-router-dom';
import { REPO_INFO_PATH } from '../../../../path';

export function GithubRepoList() {
  const { actions } = useGithubRepoListSlice();
  useUserNameChange();

  const username = useSelector(selectUsername);
  const repos = useSelector(selectRepoListRepos);
  const isLoading = useSelector(selectRepoListLoading);
  const error = useSelector(selectRepoListError);

  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(actions.loadRepos());
  }, [username, dispatch, actions]);

  return (
    <Wrapper>
      {isLoading && <LoadingIndicator small />}
      {repos?.length > 0 ? (
        <List>
          {repos.map(repo => (
            <RepoItem
              key={repo.id}
              onClick={event => {
                event.preventDefault();
                history.push(
                  REPO_INFO_PATH.replace(':userName', username).replace(
                    ':repoId',
                    repo.name,
                  ),
                );
              }}
              name={repo.name}
              starCount={repo.stargazers_count}
              url={repo.html_url}
            />
          ))}
        </List>
      ) : error ? (
        <ErrorText>{repoErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
}

export const repoErrorText = (error: RepoErrorType) => {
  switch (error) {
    case RepoErrorType.USER_NOT_FOUND:
      return 'There is no such user 😞';
    case RepoErrorType.USERNAME_EMPTY:
      return 'Type any Github username';
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
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
