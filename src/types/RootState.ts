import { GithubRepoFormState } from 'app/pages/HomePage/Features/GithubRepoForm/slice/types';
import { ThemeState } from 'styles/theme/slice/types';
import { GithubRepoListState } from '../app/pages/ReposListPage/Features/GithubRepoList/slice/types';
import { GithubRepoInfoState } from '../app/pages/RepoInfoPage/Features/GithubRepoInfo/slice/types';
// [IMPORT NEW CONTAINER STATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  githubRepoForm?: GithubRepoFormState;
  githubRepoList?: GithubRepoListState;
  githubRepoInfo?: GithubRepoInfoState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
