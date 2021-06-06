import { Router } from "express";
import formatResponse from "../../utils/formatResponse";
import RepositoryRepo from "../../database/repository/RepositoryRepo";
import UserRepo from "../../database/repository/UserRepo";
import { GithubReposResponse } from "../../interfaces";
import githubService from "../../services/github.service";
import asyncHandler from "../../utils/asyncHandler";
import logger from "../../utils/logger";
import schema from "./schema";
import validator, { ValidationSource } from "../../utils/validator";

const router = Router();

router.post(
  "/repos/:username",
  validator(schema.username, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const { username } = req.params;

    logger.info(`Called with username: ${username}`);

    const user = await UserRepo.getUserByUsername(username);
    let reposList: GithubReposResponse[] = [];
    if (user) {
      reposList = await RepositoryRepo.getRepoByUserId(user._id);
    } else {
      reposList = await githubService.fetchReposByUsername(username);
      const userId: string = await UserRepo.insertUser(username);
      await RepositoryRepo.insertMany(reposList, userId);
      logger.info(`Successfully inserted data for ${username}`);
    }

    return formatResponse({
      res,
      result: reposList
    });
  })
);

export default router;
