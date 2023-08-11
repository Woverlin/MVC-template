const express = require("express");
const authRouter = express.Router();

import { authController } from "../../controllers/auth/authController";
import validation from "../../utils/validateRequest";
import { refreshTokenInputSchema } from "../../utils/validations/authValidation";

authRouter.post("/refresh-token", validation(refreshTokenInputSchema), authController.refreshToken);

export default authRouter;
