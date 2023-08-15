import devConfig from "../config/dev.config.json";

const getConfig = (env: string) => {
  switch (env) {
    case "development":
      return devConfig;

    default:
      break;
  }
};

const config: any = getConfig("development");

const variables = {
  ...config,
  ACCESS_TOKEN_PRIVATE_KEY: config?.ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY: config?.REFRESH_TOKEN_PRIVATE_KEY,
  SALT: 10,
};

export default variables;
