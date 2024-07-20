
import mongoose from "mongoose";

const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());

const URL =
  `mongodb+srv://pranav_3:${password}@cluster0.rshhz.mongodb.net/Test2?retryWrites=true&w=majority`;

const connection = () => {
  mongoose
    .connect(`${URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log("error connecting the database!");
      console.log(err);
    });
};

export default connection;