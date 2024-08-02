"use client";

import { useAuth } from "@/components/auth.provider";

const LOGOUT_URL = "/api/logout/";

export default function Page() {
  const auth = useAuth();
  async function handleClick(event: any) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: ""
    };
    const res = await fetch(LOGOUT_URL, requestOptions);
    if (res.ok) {
      console.log("logged out");

      auth.logout();
    }
  }

  return (
    <div className="h-[95vh]">
      <div className=" max-w-md mx-auto py-5">
        <h1>Are you sure you want to logout?</h1>
        <button
          className=" bg-red-500 text-white py-3 px-2 hover:bg-red-300"
          onClick={handleClick}
        >
          OK
        </button>
      </div>
    </div>
  );
}
