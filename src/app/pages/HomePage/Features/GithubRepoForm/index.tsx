import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { TextButton } from './components/TextButton';
import { selectUsername } from './slice/selectors';
import { useGithubRepoFormSlice } from './slice';
import { REPO_LIST_PATH } from '../../../../path';
import { messages } from '../../messages';
import { useTranslation } from 'react-i18next';

export function GithubRepoForm() {
  const { t } = useTranslation();

  const { actions } = useGithubRepoFormSlice();

  const username = useSelector(selectUsername);

  const history = useHistory();

  const dispatch = useDispatch();

  const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      actions.changeUsername(evt.currentTarget.value.replace(/\s+/, '')),
    );
  };

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault && username.length > 0) {
      evt.preventDefault();
      history.push(REPO_LIST_PATH.replace(':userName', username));
    }
  };

  return (
    <Wrapper>
      <FormGroup onSubmit={onSubmitForm}>
        <InputWrapper>
          <Input
            type="text"
            placeholder={t(messages.searchBoxPlaceholder())}
            value={username}
            onChange={onChangeUsername}
          />
        </InputWrapper>
        <UiButton type="submit">{t(messages.searchBoxBtnTxt())}</UiButton>
      </FormGroup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${Input} {
    width: ${100 / 2}%;
    margin-right: 0.5rem;
  }
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;

const UiButton = styled.button`
  display: flex;
  align-self: center;
  text-align: center;
  background: ${p => p.theme.background};
  // outline: none;
  padding: 10px 60px;
  margin: 20px 0px;
  border: 1px solid rgb(220, 120, 95);
  border-radius: 10px;
  color: ${p => p.theme.primary};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;
