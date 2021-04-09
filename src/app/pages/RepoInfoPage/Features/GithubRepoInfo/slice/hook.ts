import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGithubRepoListSlice } from '../../../../ReposListPage/Features/GithubRepoList/slice';

export function useRepoIdChange() {
  const { actions } = useGithubRepoListSlice();
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const paths = location.pathname.split('/');
    if (paths.length > 3 && paths[1] === 'repo') {
      dispatch(actions.changeRepoId(paths[3]));
    }
  }, [location, dispatch, actions]);
}
