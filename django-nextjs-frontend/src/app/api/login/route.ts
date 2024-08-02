"use server";
import {
  getRefreshToken,
  getToken,
  setRefreshToken,
  setToken
} from "@/lib/auth";
import { NextResponse } from "next/server";

const API_LOGIN = "http://127.0.0.1:8001/api/token/pair";

export async function POST(request: any) {
  const myAuthToken = getToken();
  const myAuthRefreshToken = getRefreshToken();

  console.log(myAuthToken, myAuthRefreshToken);

  const requestData = await request.json();
  console.log("request data: ", requestData);
  const jsonData = JSON.stringify(requestData);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonData
  };

  const response = await fetch(API_LOGIN, requestOptions);
  const responseData = await response.json();

  if (response.ok) {
    console.log("logged in");
    const { username, access, refresh } = responseData;
    setToken(access);
    setRefreshToken(refresh);
    return NextResponse.json(
      { loggedIn: true, username: username },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { loggedIn: false, ...responseData },
    { status: 400 }
  );
}
