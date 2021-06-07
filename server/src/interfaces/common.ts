export interface GithubReposAPI {
  name: string;
  description: string;
  html_url: string;
  language: string;
}

export interface GithubReposResponse {
  name: string;
  description: string;
  url: string;
  language: string;
}

export interface GithubCommitsResponse {
  userId: string;
  repoId: string;
  count: number;
}
