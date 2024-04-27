import { NextRequest, NextResponse } from "next/server";
import todoModel from "@/app/models/todo.model";
import dbConnect from "@/app/config/dbConnect";

export async function POST(req) {
  const body = await req.json();
  const { title, description, status } = body;
  const Uid = req.cookies.get("Uid").value;

  try {
    await dbConnect();

    if (!Uid)
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 401,
        }
      );

    const response = await todoModel.create({
      title,
      description,
      status,
      Uid,
    });

    return NextResponse.json(
      {
        success: true,
        data: response,
        message: "ToDo Item Created Successfully",
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
