/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

import joi from "joi";

/** validation keys and properties of user */
export const signUpSchema = joi
  .object({
    username: joi.string().required(),
    password: joi.string().required(),
    name: joi.string().required(),
    role: joi.string(),
    isActive: joi.boolean(),
    isDeleted: joi.boolean(),
    mobileNo: joi.string().allow(null).allow(""),
  })
  .unknown(true);

const loginSchema = joi.object({
  username: joi.string().required().label("User Name"),
  password: joi.string().required().label("Password"),
});

const userSchema = {
  signUpSchema,
  loginSchema,
};

export default userSchema;
