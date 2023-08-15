import bcrypt from "bcrypt";
import User, { IUser } from "../models/user";
import dbService from "../services/dbService";
import { generateTokens } from "../utils/helper";
import { IResponse } from "../interfaces/response";
import variables from "../utils/variables";
import { Request } from "express";

const add = async (req: any, res: any) => {
  try {
    let params: any = { ...req.body };
    params = new User(params);
    let user = await dbService.create(User, params);
    return res.success({ data: user });
  } catch (error: any) {
    return res.internalServerError({ message: error?.message });
  }
};

const signUp = async (req: Request, res: any) => {
  try {
    const user: any = await dbService.findOne(User, { email: req.body.username });
    if (user)
      return res.failure({
        message: "User already exist",
      });
    const salt = await bcrypt.genSalt(variables?.SALT);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const params = new User({ ...req.body, password: hashPassword });

    await dbService.create(User, params);
    return res.success({ message: "Sign up successfully" });
  } catch (error) {
    res.failure({ message: error });
  }
};

const login = async (req: any, res: any) => {
  try {
    let params: any = { ...req.body };

    const user: any = await User.findOne({ username: req.body.username });

    if (user) {
      const verifiedPassword = await bcrypt.compare(params.password, user.password);

      if (!verifiedPassword) {
        return res.validationError({ message: "Invalid user name or password" });
      }
      const { accessToken, refreshToken } = await generateTokens(user);

      delete user.password;
      

      return res.success({
        data: { ...JSON.parse(JSON.stringify(user)), accessToken, refreshToken },
      });
    }

    return res.failure({ message: "Invalid user name or password" });
  } catch (error: any) {
    return res.internalServerError({ message: error });
  }
};

// const update = async (req: Request, res: IResponse) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       res.badRequest();
//     }
//     const params: any = { ...req.body };
//     let validateRequest = validation(params, userSchemaKey.schemaKeys);
//     if (!validateRequest.isValid) {
//       return res.validationError({
//         message: `Invalid values in parameters, ${validateRequest.message}`,
//       });
//     }
//     const updatedUser = await dbService.updateOne(User, id, params);
//     if (!updatedUser) {
//       return res.recordNotFound();
//     }
//     return res.success({ data: updatedUser });
//   } catch (error) {
//     return res.internalServerError({ message: error.message });
//   }
// };

// const read = async (req: Request, res: Response) => {
//   try {
//     const { query, options } = req.body;
//     if (!query || !options) {
//       return res.badRequest();
//     }
//     const users = await dbService.findAll(User, query, options);
//     if (!users) {
//       return res.recordNotFound();
//     }
//     return res.success({ data: users });
//   } catch (error) {
//     return res.internalServerError({ message: error.message });
//   }
// };

// const remove = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       res.badRequest();
//     }
//     const deletedUser = await dbService.deleteOne(User, id);
//     if (!deletedUser) {
//       return res.recordNotFound();
//     }
//     return res.success({ data: deletedUser });
//   } catch (error) {
//     return res.internalServerError({ message: error.message });
//   }
// };

// const getById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       res.badRequest();
//     }
//     const foundUser = await dbService.findById(User, id);
//     if (!foundUser) {
//       return res.recordNotFound();
//     }
//     return res.success({ data: foundUser });
//   } catch (error) {
//     return res.internalServerError({ message: error.message });
//   }
// };

export default {
  add,
  login,
  signUp,
  // update,
  // read,
  // remove,
  // getById,
};
