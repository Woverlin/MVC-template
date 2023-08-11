import { Request, Response, NextFunction } from "express";

const validateParams = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details.map((el: any) => el.message).join("\n");
    console.log("message", message);
    
    return {
      isValid: false,
      message,
    };
  }
  return next();
};

export default validateParams;
