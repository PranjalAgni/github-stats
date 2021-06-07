import { Router } from "express";
import { LeanDocument } from "mongoose";
import { ICommit } from "../../database/models/Commit";
import CommitRepo from "../../database/repository/CommitRepo";
import RepositoryRepo from "../../database/repository/RepositoryRepo";
import UserRepo from "../../database/repository/UserRepo";
import { GithubCommitsResponse, GithubReposResponse } from "../../interfaces";
import githubService from "../../services/github.service";
import asyncHandler from "../../utils/asyncHandler";
import formatResponse from "../../utils/formatResponse";
import logger from "../../utils/logger";
import validator, { ValidationSource } from "../../utils/validator";
import schema from "./schema";

const router = Router();

router.post(
  "/stats/:username",
  validator(schema.username, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const { username } = req.params;

    logger.info(`Called with username: ${username}`);

    const user = await UserRepo.getUserByUsername(username);
    let reposList: GithubReposResponse[] = [];
    const commitsList: GithubCommitsResponse[] = [];
    if (user) {
      const reposDocumentList = await RepositoryRepo.getRepoByUserId(user._id);
      const commitsQueryList: Promise<LeanDocument<ICommit>>[] =
        reposDocumentList.map(({ _id, name, description, language, url }) => {
          reposList.push({ name, description, language, url });
          return CommitRepo.getCommitsByRepoId(user._id, _id);
        });

      // fetching commits to a repository in parllel
      // Promise.all will ensure the order
      // So repoList and orderList is maintained

      const commitsPromise = await Promise.all(commitsQueryList);

      await commitsPromise.forEach(({ repoId, count }) => {
        commitsList.push({
          userId: user._id,
          repoId,
          count
        });
      });
    } else {
      logger.info(`Data not present, calling Github API`);
      reposList = await githubService.fetchReposByUsername(username);
      const numCommits = await githubService.fetchCommitsByRepoList(
        reposList,
        username
      );
      const userId: string = await UserRepo.insertUser(username);
      const createdReposList = await RepositoryRepo.insertMany(
        reposList,
        userId
      );

      createdReposList.forEach((repo, idx) => {
        commitsList.push({
          userId,
          repoId: repo._id,
          count: numCommits[idx]
        });
      });

      await CommitRepo.insertMany(commitsList);
      logger.info(`Successfully inserted data for ${username}`);
    }

    const reposCommitList = reposList.map((repo, idx) => ({
      ...repo,
      commits: commitsList[idx].count
    }));

    return formatResponse({
      res,
      result: reposCommitList
    });
  })
);

export default router;
