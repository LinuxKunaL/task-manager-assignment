import { Document } from "mongoose";

type IUser = Document & {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): Promise<string>;
};

export { IUser };