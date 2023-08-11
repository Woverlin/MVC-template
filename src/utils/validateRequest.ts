import { Request, Response, NextFunction } from "express";

const validateRequest =
  (schema: any, type: "body" | "params") => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type]);
    if (error) {
      const message = error.details.map((el: any) => el.message).join("\n");
      console.log("message", message);
      throw new Error("Validation error");
    } else return next();
  };

export default validateRequest;
