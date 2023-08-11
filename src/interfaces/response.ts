import { Response } from "express";

export interface IResponse extends Response {
  success: (data?: any) => void;
  failure: (data?: any) => void;
  internalServerError: (data?: any) => void;
  badRequest: (data?: any) => void;
  recordNotFound: (data?: any) => void;
  validationError: (data?: any) => void;
  unAuthorized: (data?: any) => void;
}
