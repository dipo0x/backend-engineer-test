import { NextFunction, Request, Response } from "express";
import ApiError from "../../helpers/error.handler";
import { User } from "./models/user.model";
import { Auth } from "./models/auth.model";
import bcrypt from "bcrypt";
import token from "../../utils/bcrypt.util";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAysnc.util";

export const registerUserHandler = catchAsync(async (req: Request< {}, {}, { username: string; email: string; password: string; storeName: string }>, res: Response, next: NextFunction) => {

  try {
    console.log(req)
    const { email, username, password, storeName } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim() || !storeName?.trim()) {
      return ApiError(400, "All fields are required", res);
    }

    const userExists = await User.exists({ email });
    if (userExists) {
      return ApiError(400, "User already exists", res);
    }

    const hashedPassword = await token.hashPassword(password)

    const auth = await Auth.create({
      password: hashedPassword,
    });

    const user = await User.create({
      username,
      email,
      authId: auth._id,
      storeName,
    });

    auth.user = new mongoose.Types.ObjectId(user._id)
    auth.save()

    return res.status(201).send({
      status: 201,
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        storeName: user.storeName,
      },
    });
  } catch (err) {
    console.error(err);
    return ApiError(500, "Something went wrong", res);
  }
});