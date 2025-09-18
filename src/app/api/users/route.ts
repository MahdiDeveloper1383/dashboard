import { NextResponse } from "next/server";
import { Users } from "../users";

export  async function GET(){
    return NextResponse.json(Users,{status:200})
}