import { NextResponse } from "next/server";
import { Users } from "../users";

export default function GET(){
    return NextResponse.json(Users)
}