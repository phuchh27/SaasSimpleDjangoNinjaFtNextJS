"use client";
import { useAuth } from "@/components/auth.provider";
import { ModeToggle } from "@/components/themeModeToggle";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import WaitListForm from "./waitlists/form";

type FetcherArgs = [input: RequestInfo, init?: RequestInit | undefined];

const fetcher = (...args: FetcherArgs) =>
  fetch(...args).then((res) => res.json());

export default function Home() {
  const auth = useAuth();
  const { data, error, isLoading } = useSWR(
    "http://127.0.0.1:8001/api/hello",
    fetcher
  );

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WaitListForm />
      <div className="">
        {auth.isAuthenticated ? "Hello user" : "hello guest"}
      </div>
      <div className="">
        <ModeToggle />
      </div>
    </main>
  );
}
