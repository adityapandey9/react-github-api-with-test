import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGithubRepoFormSlice } from '../../../../HomePage/Features/GithubRepoForm/slice';

export function useUserNameChange() {
  const { actions } = useGithubRepoFormSlice();
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const paths = location.pathname.split('/');
    if (paths.length > 2 && (paths[1] === 'user' || paths[1] === 'repo')) {
      dispatch(actions.changeUsername(paths[2]));
    }
  }, [location, dispatch, actions]);
}
