"use client";
import WaitListForm from "./form";
import WaitlistTable from "./table";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative gap-12">
      <WaitListForm />
      <WaitlistTable />
    </main>
  );
}
