import { LeanDocument } from "mongoose";
import { GithubReposResponse } from "../../interfaces";
import logger from "../../utils/logger";
import Repository, { IRepository } from "../models/Repository";

class RepositoryRepo {
  private static instance: RepositoryRepo;

  // Following singleton pattern
  // this will restrict to share one instance of this service across the system
  static getInstance(): RepositoryRepo {
    if (!RepositoryRepo.instance) {
      RepositoryRepo.instance = new RepositoryRepo();
    }

    return RepositoryRepo.instance;
  }

  async getRepoByUserId(userId: string, projection: unknown = {}) {
    let repos = null;
    try {
      repos = await Repository.find(
        {
          userId
        },
        projection
      );
    } catch (ex) {
      logger.error(ex);
    }
    return repos;
  }

  async insertMany(repoList: GithubReposResponse[], userId: string) {
    let insertedRepos: LeanDocument<IRepository[]> = [];
    try {
      const reposDocumentList = repoList.map((repo: GithubReposResponse) => {
        return new Repository({
          ...repo,
          userId
        });
      });

      insertedRepos = await Repository.insertMany(reposDocumentList);
    } catch (ex) {
      logger.error(ex);
    }
    return insertedRepos;
  }
}

export default RepositoryRepo.getInstance();
