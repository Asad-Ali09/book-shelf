import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: String;
  readonly email: String;
  password: String;
  profilePicture?: String;
  isGoogleID: boolean;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide a valid user name"],
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters"],
  },
  profilePicture: String,
  isGoogleID: {
    type: Boolean,
    required: true,
  },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;

export { IUser };
