import * as React from 'react';
import { GithubRepoInfo } from './GithubRepoInfo';
import { Lead } from '../../ReposListPage/Features/GithubRepoList/components/Lead';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../HomePage/Features/GithubRepoForm/slice/selectors';
import { selectRepoListRepoId } from '../../ReposListPage/Features/GithubRepoList/slice/selectors';
import { useTranslation } from 'react-i18next';
import { messages } from '../messages';

export function Features() {
  const { t } = useTranslation();

  const username = useSelector(selectUsername);
  const repoId = useSelector(selectRepoListRepoId);

  return (
    <>
      <Lead>
        {t(messages.getTitle())}{' '}
        <strong>
          {username}
          {'/'}
          {repoId}
        </strong>
      </Lead>
      <GithubRepoInfo />
    </>
  );
}
