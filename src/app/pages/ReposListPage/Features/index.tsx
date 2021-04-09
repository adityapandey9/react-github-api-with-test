import * as React from 'react';
import { GithubRepoList } from './GithubRepoList';
import { Lead } from './GithubRepoList/components/Lead';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../HomePage/Features/GithubRepoForm/slice/selectors';
import { useTranslation } from 'react-i18next';
import { messages } from '../messages';

export function Features() {
  const { t } = useTranslation();

  const username = useSelector(selectUsername);

  return (
    <>
      <Lead>
        {t(messages.getTitle())} <strong>{username}</strong>
      </Lead>
      <GithubRepoList />
    </>
  );
}
