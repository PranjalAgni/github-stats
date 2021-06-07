import fetch from "node-fetch";
import config from "../config";
import {
  GithubCommitsResponse,
  GithubReposAPI,
  GithubReposResponse
} from "../interfaces";
import logger from "../utils/logger";

class GithubService {
  private static instance: GithubService;

  // Following singleton pattern
  // this will restrict to share one instance of this service across the system
  static getInstance(): GithubService {
    if (!GithubService.instance) {
      GithubService.instance = new GithubService();
    }

    return GithubService.instance;
  }

  async fetchReposByUsername(username: string): Promise<GithubReposResponse[]> {
    let data = [];
    try {
      const response = await fetch(
        `${config.github.base}/users/${username}/repos?sort=created`,
        {
          headers: {
            Authorization: `token ${config.github.token}`
          }
        }
      );

      const repoList = await response.json();

      data = repoList.map(
        ({ name, description, html_url, language }: GithubReposAPI) => ({
          name,
          description,
          url: html_url,
          language
        })
      );
    } catch (ex) {
      logger.error(ex);
    }
    return data;
  }

  async fetchNumberCommitRepos(
    repoName: string,
    username: string
  ): Promise<number> {
    let commitList = [];
    try {
      const response = await fetch(
        `${config.github.base}/repos/${username}/${repoName}/commits?per_page=100`,
        {
          headers: {
            Authorization: `token ${config.github.token}`
          }
        }
      );
      commitList = await response.json();
    } catch (ex) {
      logger.error(ex);
    }

    return commitList.length;
  }

  async fetchCommitsByRepoList(
    repoList: GithubReposResponse[],
    username: string
  ): Promise<number[]> {
    const commitsCount: number[] = [];
    try {
      const commitsPromise = repoList.map(({ name }) => {
        return this.fetchNumberCommitRepos(name, username);
      });

      const commits = await Promise.all(commitsPromise);

      commits.forEach((numCommit) => {
        commitsCount.push(numCommit);
      });
    } catch (ex) {
      logger.error(ex);
    }

    return commitsCount;
  }
}

export default GithubService.getInstance();
