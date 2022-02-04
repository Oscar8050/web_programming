import dotenv from "dotenv-defaults";
import mongoose from "mongoose";

const connection = () => {
    dotenv.config();
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((res) => console.log("mongo db connection created"));
}

export default connection;

