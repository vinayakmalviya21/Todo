import { NextRequest, NextResponse } from "next/server";
import todoModel from "@/app/models/todo.model";
import dbConnect from "@/app/config/dbConnect";

export async function PUT(req, { params }) {
  const body = await req.json();
  const { id } = params;
  const { title, description, status } = body;

  try {
    await dbConnect();

    const todo = await todoModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title,
        description,
        status,
        updateAt: Date.now(),
      },
      { new: true }
    );
    return NextResponse.json(
      {
        success: true,
        data: todo,
        message: "Updated Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}
