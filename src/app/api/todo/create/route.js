import { NextRequest, NextResponse } from "next/server";
import todoModel from "@/app/models/todo.model";
import dbConnect from "@/app/config/dbConnect";

export async function POST(req) {
    const body = await req.json();
    const { title, description, status } = body;

    const Uid = req.cookies.get('Uid').value;

    console.log("Cookies are: ",cookies);

  try {

    await dbConnect();

    //extract title and description from request body
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
    //create a new Todo Obj and insert in DB
    const response = await todoModel.create({ title, description, status, Uid });
    //send a json response with a success flag
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
    console.error(err);
    console.log(err);
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
