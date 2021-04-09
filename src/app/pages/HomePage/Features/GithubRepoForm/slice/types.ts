/* --- STATE --- */
export interface GithubRepoFormState {
  username: string;
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = GithubRepoFormState;
