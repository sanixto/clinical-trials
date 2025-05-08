import { NextResponse } from "next/server";
import Application from "@/db/models/aplication";
import connectMongoDB from "@/db/mongodb";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectMongoDB();
    await Application.create(data);
    return NextResponse.json(
      { message: "Application Created" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}
