import { NextRequest, NextResponse } from "next/server";
import { Users } from "../../../_lib/users";


export const runtime = "nodejs";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = Number(params.id);
  const user = Users.find((u) => u.id === userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
