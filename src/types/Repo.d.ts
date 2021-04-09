// Copied from '@octokit/rest'
interface ReposListForksResponseItem {
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: string;
  default_branch: string;
  deployments_url: string;
  description: string;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: string;
  hooks_url: string;
  html_url: string;
  id: number;
  is_template: boolean;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: null;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  mirror_url: string;
  name: string;
  network_count: number;
  node_id: string;
  notifications_url: string;
  open_issues_count: number;
  owner: { login: string };
  private: boolean;
  pulls_url: string;
  pushed_at: string;
  releases_url: string;
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_count: number;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  template_repository: null;
  topics: Array<string>;
  trees_url: string;
  updated_at: string;
  url: string;
  watchers_count: number;
}

export interface Repo extends ReposListForksResponseItem {
  forks: number;
  open_issues: number;
  watchers: number;
}

interface RepoFileUIStruct {
  path: string;
  type: string;
  size?: number;
  url: string;
  mode: string;
  sha: string;
}

export interface RepoFileStruct {
  readMe: string;
  sha: string;
  url: string;
  tree: RepoFileUIStruct[];
}

export interface FileContentRepo {
  node_id: string;
  url: string;
  size?: number;
  content: string;
  encoding: string;
  sha: string;
}
