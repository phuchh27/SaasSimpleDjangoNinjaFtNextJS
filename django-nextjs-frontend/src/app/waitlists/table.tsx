"use client";
import { useAuth } from "@/components/auth.provider";
import Alert from "@/components/layout/Alert";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Key, useEffect } from "react";
import useSWR from "swr";

class FetchError extends Error {
  info: any;
  status: number;

  constructor(message: string, info: any, status: number) {
    super(message);
    this.info = info;
    this.status = status;
  }
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorInfo = await res.json();
    throw new FetchError(
      "An error occurred while fetching data",
      errorInfo,
      res.status
    );
  }
  return res.json();
};

const WAITLIST_API_URL = "/api/waitlists/";

export default function WaitlistTable() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher);
  const auth = useAuth();
  useEffect(() => {
    if (error?.status === 401) {
      auth.logoutRequiredRedirect();
    }
  }, [auth, error]);
  if (error)
    return (
      <Alert
        title="An Error occurred"
        description={`Failed to fetch data ${error}`}
        error={true}
      />
    );
  if (isLoading) return <div className="">Loading .... </div>;
  console.log(data);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any, idx: Key | null | undefined) => (
          <TableRow
            key={`item-${idx}`}
            onClick={(e) => router.push(`/waitlists/${item.id}`)}
            className=" hover:cursor-pointer"
          >
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell className="font-medium">{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
