const express = require("express");
const authRouter = express.Router();

import { authController } from "../controllers/authController";
import validation from "../utils/validateRequest";
import authSchema from "../validations/authValidation";

authRouter.post(
  "/refresh-token",
  validation(authSchema.refreshTokenInputSchema, "body"),
  authController.refreshToken
);

export default authRouter;
