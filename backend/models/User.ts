import mongoose, { HydratedDocument, Model } from "mongoose";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {IUser} from "../types";

interface UserMethods {
  checkPassword: (password: string) => Promise<boolean>;
  generateToken(): void;
}

export const JWT = process.env.JWT_SECRET || "default_fallback_secret";

type UserModel = Model<IUser, {}, UserMethods>;

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const UserSchema = new mongoose.Schema<
  HydratedDocument<IUser>,
  UserModel,
  UserMethods,
  {}
>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        const generalEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return generalEmailRegex.test(value) && value.endsWith("@gmail.com");
      },
      message: (props) => `${props.value} must be a valid @gmail.com email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
  token: {
    type: String,
    required: true,
  },
  googleID: {
    type: String,
    default: null,
  },
  displayName: {
    type: String,
    required: true,
  },
});

UserSchema.methods.checkPassword = async function (password: string) {
  return await argon2.verify(this.password, password);
};

UserSchema.methods.generateToken = function () {
  this.token = jwt.sign({ _id: this._id }, JWT, { expiresIn: "30d" });
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await argon2.hash(this.password, ARGON2_OPTIONS);
  next();
});

UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
