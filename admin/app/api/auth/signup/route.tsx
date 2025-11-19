import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/db/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Admin created successfully",
        user: { id: user.id, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
