import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '..';

import { githubRepoInfoSaga, getRepoById } from '../saga';
import { RepoErrorType } from '../types';

describe('getRepoById Saga', () => {
  let username: any;
  let repoId: any;
  let repos: any;
  let getReposIterator: ReturnType<typeof getRepoById>;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposIterator = getRepoById();
    const delayDescriptor = getReposIterator.next().value;
    expect(delayDescriptor).toMatchSnapshot();

    const selectDescriptor = getReposIterator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should return error if username is empty', () => {
    username = '';
    let putDescriptor = getReposIterator.next(username).value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoInfoActions.repoError(RepoErrorType.USERNAME_EMPTY)),
    );

    const iteration = getReposIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should return error if repoId is empty', () => {
    username = 'test_username';
    repoId = '';
    getReposIterator.next(username);
    let putDescriptor = getReposIterator.next(repoId).value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoInfoActions.repoError(RepoErrorType.USERNAME_EMPTY)),
    );

    const iteration = getReposIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should return error if repos is empty', () => {
    username = 'test_username';
    repoId = 'test_repo';
    repos = [];
    getReposIterator.next(username);
    getReposIterator.next(repoId);
    getReposIterator.next(repos);
    let putDescriptor = getReposIterator.next(repos).value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoInfoActions.repoError(RepoErrorType.USER_NOT_FOUND)),
    );

    const iteration = getReposIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should dispatch the reposLoaded action if it requests the data without default branch unsuccessfully', () => {
    username = 'test';
    repoId = 'test_repo';

    repos = [
      {
        name: 'test_repo',
        owner: {
          login: 'username1',
        },
      },
    ];

    const requestUserDescriptor = getReposIterator.next(username).value;
    expect(requestUserDescriptor).toMatchSnapshot();

    const requestRepoDescriptor = getReposIterator.next(repoId).value;
    expect(requestRepoDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.next(repos).value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoInfoActions.repoError(RepoErrorType.USER_NOT_FOUND)),
    );

    const iteration = getReposIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should dispatch the reposLoaded action if it requests the repo without tree data unsuccessfully', () => {
    username = 'test';
    repoId = 'test_repo';

    repos = [
      {
        name: 'test_repo',
        owner: {
          login: 'username1',
        },
        default_branch: 'main',
      },
    ];

    const requestUserDescriptor = getReposIterator.next(username).value;
    expect(requestUserDescriptor).toMatchSnapshot();

    const requestRepoIdDescriptor = getReposIterator.next(repoId).value;
    expect(requestRepoIdDescriptor).toMatchSnapshot();

    const requestRepoListDescriptor = getReposIterator.next(repos).value;
    expect(requestRepoListDescriptor).toMatchSnapshot();

    repos = {
      readMe: 'test read me',
      sha: 'test_sha',
      url: 'test_url',
      tree: [],
    };

    const putRepoInfoDescriptor = getReposIterator.next(repos).value;
    expect(putRepoInfoDescriptor).toEqual(
      put(
        slice.githubRepoInfoActions.repoError(RepoErrorType.USER_HAS_NO_REPO),
      ),
    );
  });

  it('should dispatch the reposLoaded action if it requests the repo with tree data successfully', () => {
    username = 'test';
    repoId = 'test_repo';

    repos = [
      {
        name: 'test_repo',
        owner: {
          login: 'username1',
        },
        default_branch: 'main',
      },
    ];

    const requestUserDescriptor = getReposIterator.next(username).value;
    expect(requestUserDescriptor).toMatchSnapshot();

    const requestRepoDescriptor = getReposIterator.next(repoId).value;
    expect(requestRepoDescriptor).toMatchSnapshot();

    const requestRepoListDescriptor = getReposIterator.next(repos).value;
    expect(requestRepoListDescriptor).toMatchSnapshot();

    repos = {
      readMe: 'test read me',
      sha: 'test_sha',
      url: 'test_url',
      tree: [
        {
          path: 'README.md',
          mode: '100644',
          type: 'blob',
          sha: '209f8e6e9c3cafa816f61d04eafa6c86552bf3db',
          size: 47,
          url:
            'https://api.github.com/repos/adityapandey/adventofcode/git/blobs/209f8e6e9c3cafa816f61d04eafa6c86552bf3db',
        },
      ],
    };

    const requestRepoInfoDescriptor = getReposIterator.next(repos).value;
    expect(requestRepoInfoDescriptor).toMatchSnapshot();

    const base64Content: any = {
      sha: '209f8e6e9c3cafa816f61d04eafa6c86552bf3db',
      node_id:
        'MDQ6QmxvYjMzMjY2MDg3MDoyMDlmOGU2ZTljM2NhZmE4MTZmNjFkMDRlYWZhNmM4NjU1MmJmM2Ri',
      size: 47,
      url:
        'https://api.github.com/repos/adityapandey/adventofcode/git/blobs/209f8e6e9c3cafa816f61d04eafa6c86552bf3db',
      content:
        'IyBhZHZlbnRvZmNvZGUKQWR2ZW50IG9mIENvZGU6IHNvbHV0aW9ucyBpbiBH\nby4=\n',
      encoding: 'base64',
    };
    const putRepoInfoDescriptor = getReposIterator.next(base64Content).value;

    expect(putRepoInfoDescriptor).toEqual(
      put(slice.githubRepoInfoActions.reposLoaded(repos)),
    );
  });

  it('should dispatch the user not found error', () => {
    username = 'test';
    repoId = 'test';
    repos = [];

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const requestRepoIdDescriptor = getReposIterator.next(repoId).value;
    expect(requestRepoIdDescriptor).toMatchSnapshot();

    const requestReposDescriptor = getReposIterator.next(repos).value;
    expect(requestReposDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.throw({ response: { status: 404 } })
      .value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoInfoActions.repoError(RepoErrorType.USER_NOT_FOUND)),
    );
  });

  it('should dispatch the user has no repo error', () => {
    username = 'test';
    repoId = 'test';
    repos = [];

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const requestRepoIdDescriptor = getReposIterator.next(repoId).value;
    expect(requestRepoIdDescriptor).toMatchSnapshot();

    const requestReposDescriptor = getReposIterator.next(repos).value;
    expect(requestReposDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.next(repos).value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoInfoActions.repoError(RepoErrorType.USER_NOT_FOUND)),
    );
  });

  it('should dispatch the github rate limit error', () => {
    username = 'test';
    repoId = 'test';
    repos = [];

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const requestRepoIdDescriptor = getReposIterator.next(repoId).value;
    expect(requestRepoIdDescriptor).toMatchSnapshot();

    const requestReposDescriptor = getReposIterator.next(repos).value;
    expect(requestReposDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.throw(new Error('Failed to fetch'))
      .value;
    expect(putDescriptor).toEqual(
      put(
        slice.githubRepoInfoActions.repoError(RepoErrorType.GITHUB_RATE_LIMIT),
      ),
    );
  });

  it('should dispatch the response error', () => {
    username = 'test';
    repoId = 'test';
    repos = [];

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const requestRepoIdDescriptor = getReposIterator.next(repoId).value;
    expect(requestRepoIdDescriptor).toMatchSnapshot();

    const requestReposDescriptor = getReposIterator.next(repos).value;
    expect(requestReposDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.throw(new Error('some error')).value;
    expect(putDescriptor).toEqual(
      put(slice.githubRepoInfoActions.repoError(RepoErrorType.RESPONSE_ERROR)),
    );
  });
});

describe('githubRepoInfoSaga Saga', () => {
  const githubRepoFormIterator = githubRepoInfoSaga();
  it('should start task to watch for loadRepos action', () => {
    const takeLatestDescriptor = githubRepoFormIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.githubRepoInfoActions.loadRepoById.type, getRepoById),
    );
  });
});
