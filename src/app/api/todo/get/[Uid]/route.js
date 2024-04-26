import { NextRequest, NextResponse } from "next/server";
import todoModel from "@/app/models/todo.model";
import dbConnect from "@/app/config/dbConnect";

export async function GET(req, { params }) {

  const { Uid } = params;
  console.log(Uid);

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

    // fetch all todo items from database
    const todos = await todoModel.find({ Uid });

    return NextResponse.json(
      {
        success: true,
        data: todos,
        message: "Entire Todo Data is Fetched",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    // console.error(err);
    // console.log(err);
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
