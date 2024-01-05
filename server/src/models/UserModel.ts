import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  name: string;
  readonly email: string;
  password: string;
  profilePicture?: string;
  toResponseObject(): {
    name: string;
    email: string;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
  createJWT(): string;
}

type TokenType = {
  userID: string;
  email: string;
};

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
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

//---- Convert to object that should be sent to user ------------------------------
UserSchema.methods.toResponseObject = function () {
  const user = this.toObject() as IUser;

  const filteredUser = Object.keys(user)
    .filter((k) => k !== "password")
    .reduce((acc: Record<string, any>, key: string) => {
      acc[key] = user[key as keyof typeof user];
      return acc;
    }, {});

  return filteredUser;
};

// --- Create JSON web token ---------------
UserSchema.methods.createJWT = function () {
  const payload: TokenType = {
    userID: this._id,
    email: this.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRY!,
  });
};

//---- Check if password is valid ------------------------------------------------
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;

export { IUser, TokenType };
