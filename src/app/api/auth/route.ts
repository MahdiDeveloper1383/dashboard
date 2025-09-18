import { NextRequest, NextResponse } from "next/server";
import { Users } from "../users";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (Math.random() < 0.1) {
      return NextResponse.json({ message: "connection failed" }, { status: 500 });
    }

    const user = Users.find(u => u.username === username && u.password === password);

    if (!user) {
      return NextResponse.json({ message: "username or password is wrong" }, { status: 401 });
    }

    const token = `JWT-TOKEN-${user.id}`;
    const response = NextResponse.json({ token,userId:user.id, role: user.role }, { status: 200 })
    response.cookies.set('token',token,{httpOnly:true,secure:process.env.NODE_ENV === 'production',path:'/',maxAge:60*60*24});
    return response
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
