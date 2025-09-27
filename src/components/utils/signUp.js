"use server";

import VIPFOODUSERS from "@/models/vipFoodUsers";
import connectDB from "./connectDB";

export default async function SignUpFun(role, userName, email, hashedPassword) {
  try {
    await connectDB();
    const newUser = await VIPFOODUSERS.create({
      role,
      userName,
      email,
      password : hashedPassword,
    });
    return JSON.parse(JSON.stringify(newUser.userName));
  } catch (error) {
    console.log(error.message);
  }
}

export async function checkUserandEmail(userName, email) {
  try {
    await connectDB();
    const checkUser = await VIPFOODUSERS.find({ userName: userName });
    const checkEmail = await VIPFOODUSERS.find({ email: email });
    if (checkUser.length > 0 && checkEmail.length > 0) {
      return "Username & email already exists";
    } else if (checkEmail.length > 0) {
      return "email already exists";
    } else if (checkUser.length > 0) {
      return "Username already exists";
    }
  } catch (error) {
    console.log(error.message);
  }
}
