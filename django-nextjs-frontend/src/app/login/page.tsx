"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth.provider";

const LOGIN_URL = "/api/login/";

interface LoginResponse {
  username: string;
  access: string;
  refresh: string;
}
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
    let data: LoginResponse = { username: "", access: "", refresh: "" };
    try {
      data = await res.json();
    } catch (error) {}
    if (res.ok) {
      console.log("logged in");
      auth.login(data.username);
    } else {
      console.log(await res.json());
    }
  }
  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2 xl:min-h-[calc(100vh-64px)]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">User Name</Label>
                <Input
                  id="username"
                  type="username"
                  name="username"
                  placeholder="Your username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className=" hidden ">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </form>
          </div>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
