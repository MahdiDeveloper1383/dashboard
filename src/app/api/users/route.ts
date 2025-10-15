import { Users } from "@/app/_lib/users";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(Users, { status: 200 });
}
