import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";

import customResponse from "./utils/response"

dotenv.config({ path: ".env" });

import "./config/dbConfig";

declare global {
  namespace NodeJS {
    interface Global {
      __basedir: string;
    }
  }
}

const app = express();
const corsOptions: cors.CorsOptions = { origin: process.env.ALLOW_ORIGIN || "" };
app.use(cors(corsOptions));

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Response handler middleware
app.use(customResponse);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/user", userRouter);
app.use("/auth", authRouter);

// Swagger Documentation
// postmanToOpenApi('postman/MVC Template.postman_collection.json', path.join('postman/swagger.yml'), {
//   defaultTag: 'General',
// })
//   .then(() => {
//     let result: any = YAML.load('postman/swagger.yml');
//     result.servers[0].url = '/';
//     app.use('/swagger', swaggerUi.serve, swaggerUi.setup(result));
//   })
//   .catch((e: any) => {
//     console.log('Swagger Generation stopped due to some error');
//   });

app.get("/", (req, res) => {
  res.render("index");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log(`Your application is running on ${process.env.PORT}`);
  });
} else {
  module.exports = app;
}
