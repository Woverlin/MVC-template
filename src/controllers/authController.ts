import jwt from "jsonwebtoken";
import { IResponse } from "../interfaces/response";
import { ITokenDetail } from "../interfaces/userToken";
import UserToken from "../models/userToken";
import variables from "../utils/variables";

const refreshToken = async (req: any, res: IResponse) => {
  try {
    let refreshToken = req?.body?.refreshToken;
    const userToken = await UserToken.findOne({ token: refreshToken });
    if (userToken) {
      const tokenDetails: any = jwt.verify(refreshToken, variables.REFRESH_TOKEN_PRIVATE_KEY);

      if (tokenDetails) {
        const payload = { _id: tokenDetails.id, roles: tokenDetails.role };
        const accessToken = jwt.sign(payload, variables.ACCESS_TOKEN_PRIVATE_KEY, {
          expiresIn: "14m",
        });
        return res.success({
          accessToken,
        });
      }
    }
  } catch (error) {
    res.unAuthorized();
  }
};

export const authController = {
  refreshToken,
};
