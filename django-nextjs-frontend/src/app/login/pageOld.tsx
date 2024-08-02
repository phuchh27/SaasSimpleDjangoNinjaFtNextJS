"use client";

import { useAuth } from "@/components/auth.provider";

const LOGIN_URL = "/api/login/";

export default function Page() {
  const auth = useAuth();

  async function handleSubmit(event: any) {
    event.preventDefault();
    console.log(event, event.target);
    const formData = new FormData(event.target);
    const objectFromForm = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFromForm);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonData
    };
    const res = await fetch(LOGIN_URL, requestOptions);
    if (res.ok) {
      console.log("logged in");
      auth.login();
    }
  }

  return (
    <div className="h-[95vh]">
      <div className=" max-w-md mx-auto py-5">
        <h1>Login now</h1>
        <form onSubmit={handleSubmit} className=" flex gap-5">
          <input
            className=" py-2 px-2 rounded-sm border-2  border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none "
            type="text"
            name="username"
            required
            placeholder="Your Username"
          />
          <input
            className=" py-2 px-2 rounded-sm border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none "
            type="password"
            name="password"
            required
            placeholder="Your Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
