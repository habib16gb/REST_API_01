import mongoose from "mongoose";
const userShema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  authentication: { type: String, require: true, select: false },
  salt: { type: String, select: false },
  sessionToken: { type: String, select: false },
});

export const userModel = mongoose.model("User", userShema);

export const getUsers = () => userModel.find();
export const getUserByEmail = (email: String) => userModel.findOne({ email });
export const getuserBySessionToken = (sessionToken: String) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: String) => userModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: String) =>
  userModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: String, values: Record<string, any>) =>
  userModel.findByIdAndUpdate(id, values);
