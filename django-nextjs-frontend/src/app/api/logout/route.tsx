import { deleteToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const myTokenResponse = deleteToken();
  console.log(myTokenResponse);
  return NextResponse.json({ token: myTokenResponse }, { status: 200 });
}
