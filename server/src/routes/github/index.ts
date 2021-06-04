import { Router } from "express";
import githubService from "../../services/github.service";
import logger from "../../utils/logger";

const router = Router();

router.get("/repos", async (req, res, next) => {
  try {
    const reposList = await githubService.fetchUserRepos("PranjalAgni");
    return res.json(reposList);
  } catch (ex) {
    logger.error(ex);
    return next(ex);
  }
});

export default router;
