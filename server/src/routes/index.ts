import { Router } from "express";
import githubRouter from "./github/githubRepo";

const router = Router();

router.use("/github", githubRouter);

export default router;
