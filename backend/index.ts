import express from "express";
import config from "./config";
import * as mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routers/users";

const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());
// app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use(express.static("public"));

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
