import { NextRequest, NextResponse } from "next/server";
import todoModel from "@/app/models/todo.model";
import dbConnect from "@/app/config/dbConnect";

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await dbConnect();

    await todoModel.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Todo deleted successfully",
        data: {
          id: id,
        },
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
