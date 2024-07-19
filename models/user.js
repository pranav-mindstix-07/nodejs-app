import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;