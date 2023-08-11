const joi = require("joi");

export const refreshTokenInputSchema = joi.object({
  refreshToken: joi.string(),
});

