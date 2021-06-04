import fetch from "node-fetch";
import { GithubRepository } from "../interfaces";
import config from "../config";
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

  async fetchUserRepos(username: string) {
    let data = [];
    try {
      const response = await fetch(
        `${config.github.base}/users/${username}/repos`
      );

      const repoList = await response.json();

      data = repoList.map(
        ({ name, description, html_url, language }: GithubRepository) => ({
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
}

export default GithubService.getInstance();
