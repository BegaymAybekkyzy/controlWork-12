import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  publicPath: path.join(rootPath, "public"),
  db: "mongodb://localhost/fitness",
};

export default config;
