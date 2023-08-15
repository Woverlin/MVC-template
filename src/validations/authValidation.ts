const joi = require("joi");

export const refreshTokenInputSchema = joi.object({
  refreshToken: joi.string().required().label("Refresh Token"),
});

const authSchema = {
  refreshTokenInputSchema,
};
export default authSchema;
