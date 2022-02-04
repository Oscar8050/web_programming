import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

async function connect() {
  // TODO 1.1 Connect your MongoDB
    const dboptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    mongoose
        .connect(process.env.MONGO_URL, dboptions)
        .then((res) => console.log("mongo db connection created"))
    dataInit()
}

export default { connect };