import jwt from "jsonwebtoken";
import UserToken from "../models/userToken";
import variables from "./variables";

export const generateTokens = async (user: { _id: string; role: string }) => {

  console.log('====================================');
  console.log("variables", variables);
  console.log('====================================');

  try {
    const payload = { _id: user._id, role: user.role };
    const accessToken = jwt.sign(payload, variables.ACCESS_TOKEN_PRIVATE_KEY ?? "", {
      expiresIn: "14m",
    });
    const refreshToken = jwt.sign(payload, variables.REFRESH_TOKEN_PRIVATE_KEY ?? "", {
      expiresIn: "30d",
    });

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.remove();

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    console.log('====================================');
    console.log("err", err);
    console.log('====================================');
    return Promise.reject(err);
  }
};
