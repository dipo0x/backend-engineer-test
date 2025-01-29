import { NextFunction, Request, Response } from "express";
import ApiError from "../../helpers/error.handler";
import { User } from "./models/user.model";
import { Auth } from "./models/auth.model";
import token from "../../utils/bcrypt.util";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAysnc.util";
import jwtUtil from "../../utils/jwt.util";

export const registerUserHandler = catchAsync(async (
  req: Request< {}, {},
  {
    username: string;
    email: string;
    password: string;
    storeName: string }>,
  res: Response,
  next: NextFunction) => {
  try {
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

export const loginUserHandler = catchAsync(async (req: Request< {}, {}, {
  email: string;
  password: string;
}>, res: Response, next: NextFunction) => {
  try {
    let { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
        return ApiError(400, 'All fields are required', res);
    }
    const user = await User.findOne({ email }).populate('authId');
    if(!user || !('password' in user.authId)){
        return ApiError(404, 'User with this email not found', res);
    }
    const isCorrectPassword = await token.comparePasswords(password, user.authId.password)
    if(!isCorrectPassword){
      return res.status(400).send({
        status: 400,
        success: false,
        message: "Incorrect password"
      });
    }
    const access_token = jwtUtil.signToken({ _id: user._id});
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      storeName: user.storeName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    const message = {
      user: userResponse,
      access_token
    }
    return res.status(200).send({
      status: 200,
      success: true,
      message: "User successfully logged in",
      data: message
    });
  }
  catch (err) {
    console.log(err)
    ApiError(500, 'Something went wrong', res);
  }
})