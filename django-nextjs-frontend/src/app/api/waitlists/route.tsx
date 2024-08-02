import { getToken } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import APiProxy from "../proxy";

const DJANGO_API_WAITLISTS_URL = "http://127.0.0.1:8001/api/waitlists/";

export async function GET(request: any) {
  const { data, status } = await APiProxy.get(DJANGO_API_WAITLISTS_URL, true);
  return NextResponse.json(data, { status: status });
}

export async function POST(request: any) {
  const requestData = await request.json();

  const { data, status } = await APiProxy.post(
    DJANGO_API_WAITLISTS_URL,
    requestData,
    true
  );
  return NextResponse.json(data, { status: status });
}
