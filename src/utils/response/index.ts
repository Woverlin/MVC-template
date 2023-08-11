/**
 * responseHandler.ts
 * @description :: response middleware
 */

import { Request, Response, NextFunction } from 'express';
import  handler from './responseHandler';
import  statusCode from './responseCode';

const responseHandler = (req: Request, res: any, next: NextFunction) => {
  res.success = (data: any = {}) => {
    res.status(statusCode.success).json(handler.success(data));
  };
  res.failure = (data: any = {}) => {
    res.status(statusCode.success).json(handler.failure(data));
  };
  res.internalServerError = (data: any = {}) => {
    res.status(statusCode.internalServerError).json(handler.internalServerError(data));
  };
  res.badRequest = (data: any = {}) => {
    res.status(statusCode.badRequest).json(handler.badRequest(data));
  };
  res.recordNotFound = (data: any = {}) => {
    res.status(statusCode.success).json(handler.recordNotFound(data));
  };
  res.validationError = (data: any = {}) => {
    res.status(statusCode.validationError).json(handler.validationError(data));
  };
  res.unAuthorized = (data: any = {}) => {
    res.status(statusCode.unAuthorized).json(handler.unAuthorized(data));
  };
  next();
};

export default responseHandler;