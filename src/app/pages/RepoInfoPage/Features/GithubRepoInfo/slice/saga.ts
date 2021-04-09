import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { githubRepoInfoActions as actions } from '.';
import { FileContentRepo, Repo, RepoFileStruct } from 'types/Repo';
import { RepoErrorType } from './types';
import { selectUsername } from '../../../../HomePage/Features/GithubRepoForm/slice/selectors';
import {
  selectRepoListRepoId,
  selectRepoListRepos,
} from '../../../../ReposListPage/Features/GithubRepoList/slice/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepoById() {
  yield delay(500);
  // Select username from store
  const username: string = yield select(selectUsername);
  if (username.length === 0) {
    yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
    return;
  }
  const repoId: string = yield select(selectRepoListRepoId);
  if (repoId.length === 0) {
    yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
    return;
  }

  try {
    let repos: Repo[] = yield select(selectRepoListRepos);

    if (repos.length === 0) {
      const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
      repos = yield call(request, requestURL);
    }

    const filterRepo = repos.filter(item => item.name === repoId);

    if (
      filterRepo.length === 0 ||
      (filterRepo.length > 0 && !filterRepo[0].default_branch)
    ) {
      yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
      return;
    }

    const repo: Repo = filterRepo[0];
    const requestURL = `https://api.github.com/repos/${username}/${repoId}/git/trees/${repo.default_branch}?recursive=1`;

    // Call our request helper (see 'utils/request')
    const repoInfo: RepoFileStruct = yield call(request, requestURL);
    if (!(repoInfo?.tree && repoInfo.tree.length > 0)) {
      yield put(actions.repoError(RepoErrorType.USER_HAS_NO_REPO));
      return;
    }

    const doesReadMDFileExist = repoInfo.tree.filter(item =>
      item.path.toLowerCase().includes('readme.md'),
    );

    repoInfo.tree = repoInfo.tree.filter(item => !item.path.includes('/'));

    if (doesReadMDFileExist.length > 0) {
      const readMeURL = doesReadMDFileExist[0].url;
      // Call our request helper (see 'utils/request')
      const readMeFile: FileContentRepo = yield call(request, readMeURL);
      repoInfo.readMe = atob(readMeFile.content);
    }

    yield put(actions.reposLoaded(repoInfo));
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubRepoInfoSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadRepoById.type, getRepoById);
}
