import { LeanDocument } from "mongoose";
import { GithubCommitsResponse, GithubReposResponse } from "../../interfaces";
import logger from "../../utils/logger";
import Commit, { ICommit } from "../models/Commit";
import { IRepository } from "../models/Repository";

class CommitRepo {
  private static instance: CommitRepo;

  // Following singleton pattern
  // this will restrict to share one instance of this service across the system
  static getInstance(): CommitRepo {
    if (!CommitRepo.instance) {
      CommitRepo.instance = new CommitRepo();
    }

    return CommitRepo.instance;
  }

  async getCommitsByRepoId(
    userId: string,
    repoId: string,
    projection: unknown = {}
  ): Promise<LeanDocument<ICommit>> {
    let commits: ICommit = null;
    try {
      commits = await Commit.findOne(
        {
          userId,
          repoId
        },
        projection
      ).lean();
    } catch (ex) {
      logger.error(ex);
    }
    return commits;
  }

  async insertMany(commitList: GithubCommitsResponse[]) {
    try {
      const commitDocumentList = commitList.map((commit) => {
        return new Commit({
          ...commit
        });
      });

      await Commit.insertMany(commitDocumentList);
    } catch (ex) {
      logger.error(ex);
    }
  }
}

export default CommitRepo.getInstance();
