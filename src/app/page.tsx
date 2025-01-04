'use client'
 
import { Suspense } from "react";
import styles from "./page.module.css";
import Link from 'next/link'
import UserList from "@/ui/components/UserList";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>User Management</h1>
      <div className={styles.menu}>
        <Suspense fallback={<div>Loading...</div> }>
          <UserList itemStyle={styles.userItem} itemActionStyle={styles.actionItem} />
        </Suspense>
      </div>
      <div className={styles.actions}><Link href="/user/add">Add User</Link></div>
    </div>
  );
}
