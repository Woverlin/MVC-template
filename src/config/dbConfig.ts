/**
 * dbConfig.ts
 * @description :: exports database connection using mongoose
 */

import mongoose from "mongoose";


console.log("process.env", process.env.NODE_ENV );


const uri: string | undefined =
  process.env.NODE_ENV === "test" ? process.env.DB_TEST_URL : process.env.DB_URL;

  console.log("uri", uri);
  
mongoose.connect(uri!);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connection Successful");
});

db.on("error", () => {
  console.log("Error in MongoDB connection");
});

export default mongoose;
