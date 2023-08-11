/**
 * index.js
 * @description :: index route of all models
 */

import express from "express";
const authRouter = express.Router();

authRouter.use("/user", () => {});

export default authRouter;
