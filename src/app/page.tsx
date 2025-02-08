'use client'
 
import { Suspense } from "react";
import Link from 'next/link'
import UserList from "@/ui/components/UserList";
import Page from "./ui/components/Page";

export default function Home() {
  return (
    <Page title="User Management">
      <div className="flex flex-col p-4">
        <Suspense fallback={<div>Loading...</div> }>
          <UserList />
        </Suspense>
      </div>
      <div className="bg-green-500 p-4"><Link href="/user/add">Add User</Link></div>
    </Page>
  );
}
