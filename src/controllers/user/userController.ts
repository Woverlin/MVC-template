import { Request, Response } from "express";
import User from "../../models/user";
import validation from "../../utils/validateRequest";
import dbService from "../../services/dbService";
import { IResponse } from "../../interfaces/response";

const add = async (req: any, res: any) => {
  try {
    let params: any = { ...req.body };

    console.log("====================================");
    console.log("params", params);
    console.log("====================================");

    // log

    // let validateRequest = validation.validateParamsWithJoi(
    //   params,
    //   userSchemaKey.schemaKeys);
    // if (!validateRequest.isValid) {
    //   return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    // }
    params = new User(params);
    let user = await dbService.create(User, params);
    return res.success({ data: user });
  } catch (error: any) {
    return res.internalServerError({ message: error?.message });
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
  // update,
  // read,
  // remove,
  // getById,
};
