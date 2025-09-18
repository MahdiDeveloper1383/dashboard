// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Users } from "../../users"; 
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = Number(params.id);
  const user = Users.find((u) => u.id === userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
     const params = await context.params;
  const userId = Number(params.id);
    const body = await req.json();

    const index = Users.findIndex((u) => u.id === userId);
    if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    
    Users[index] = {
      ...Users[index],
      ...body,
    };

    return NextResponse.json(Users[index], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
