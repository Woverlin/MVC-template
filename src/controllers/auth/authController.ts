import User from "../../models/user";
import dbService from "../../services/dbService";

const refreshToken = async (req: any, res: any) => {
  try {
    let params = { ...(req.body || {}) };

    params = new User(params);
    let user = await dbService.create(User, params);
    return res.success({ data: user });
  } catch (error: any) {
    return res.internalServerError({ message: error.message });
  }
};

export const authController = {
  refreshToken,
};
