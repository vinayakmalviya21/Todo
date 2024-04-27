"use server";

import { NextRequest, NextResponse } from "next/server";
import userModel from "@/app/models/user.model";
import dbConnect from "@/app/config/dbConnect";
import { cookies } from "next/headers";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  try {
    await dbConnect();

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No User Found with Given email",
        },
        {
          status: 404,
        }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const response = NextResponse.json(
      {
        token,
        userId: user._id,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("Uid", `${user._id}`);
    return response;
  } catch (err) {
    return response.json(
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
