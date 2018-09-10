import * as fs from "fs";
import * as mongoose from "mongoose";
import * as path from "path";

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true },
);
(mongoose as any).Promise = global.Promise;
const mongos: any = mongoose.connection;

mongos.on("error", (err: any) => {
  console.log("Connection error:", err.message);
});

mongos.once("open", function callback() {
  console.log("Connected to DB!");
});

const basename = path.basename(module.filename);
const db: any = {};

fs.readdirSync(__dirname)
  .filter((file: any) => {
    return file.indexOf(".") !== 0 && file !== basename;
  })
  .forEach((file: any) => {
    if (file.slice(-3) !== ".js") {
      return;
    }
    const model = require(`./${file}`)(mongoose);
    db[model.modelName] = model;
  });
export { db };
