import { NextRequest, NextResponse } from "next/server";
import userModel from "@/app/models/user.model";
import dbConnect from "@/app/config/dbConnect";

const bcrypt = require("bcryptjs");

export async function POST(req, res) {
  const body = await req.json();
  const { name, email, password } = body;

  try {
    await dbConnect();
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const response = await newUser.save();
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        data: "Internal server error",
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
