import { Request, NextFunction } from "express";

const validateRequest =
  (schema: any, type: "body" | "params") => (req: Request, res: any, next: NextFunction) => {
    const { error } = schema.validate(req[type]);
    if (error) {
      const message = error.details.map((el: any) => el.message).join("\n");
      console.log("message", message);
      return res.validationError({ message });
    } else return next();
  };

export default validateRequest;
