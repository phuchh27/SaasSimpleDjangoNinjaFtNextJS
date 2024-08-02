"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
interface IError {
  message: string;
}

interface IErrors {
  email: IError[];
}

const WAITLIST_API_URL = "/api/waitlists/";
export default function WaitListForm() {
  const [message, setMessge] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<IErrors>({ email: [] });

  async function handleSubmit(event: any) {
    setMessge("");
    setError("");
    setErrors({ email: [] });
    event.preventDefault();
    // console.log(event, event.target);
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
    const res = await fetch(WAITLIST_API_URL, requestOptions);
    // const data = await res.json();
    // console.log(data);
    if (res.ok) {
      setMessge("Thank you for joining");
      setError("");
    } else {
      const data = await res.json();
      setErrors(data);
      if (!data.email) {
        setError("There was an error with your request. Please try again");
      }
      setMessge("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className=" space-y-4">
      <div>
        {message && (
          <div className=" bg-green-300 text-green-700 p-2 rounded-lg font-bold text-center">
            {message}
          </div>
        )}
      </div>
      <div>
        {error && (
          <div className=" bg-red-300 text-red-700 p-2 rounded-lg font-bold text-center">
            {error}
          </div>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <div
          className={
            errors?.email.length > 0
              ? " p-3 rounded-lg border border-destructive "
              : " "
          }
        >
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Your email"
            required
          />
          {errors?.email && (
            <div>
              {errors.email.map((err, idx) => {
                return !err.message ? null : (
                  <p
                    className=" p-2 bg-destructive text-center text-white"
                    key={`er-${idx}`}
                  >
                    {err.message}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Button type="submit" className="w-full">
        Joihn Waitlist
      </Button>
    </form>
  );
}
