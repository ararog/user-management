'use client'
 
import { useState, useEffect, useCallback } from 'react';
import { faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./page.module.css";
import Link from 'next/link'
import { User } from './models/User';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  async function fetchUsers() {
    const res = await fetch('http://localhost:3000/api/users')
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const updatePassword = useCallback((id: number) => {
    router.push(`/change_password/${id}`);
  }, [users]);

  const deleteItem = useCallback(async (id: number) => {
    const isConfirmed = confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE'
      });

      fetchUsers();
    }
  }, [users]);
   
  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>User Management</h1>
      <div className={styles.menu}>
        {! users ? (
          <div>Loading...</div> 
        ) : 
          <ul>
            {users?.length === 0 ? <div>No users</div>  : users.map((user) => (
              <li key={user.id} className={styles.userItem} >{user.email} 
                <FontAwesomeIcon className={styles.userItem} onClick={() => updatePassword(user.id)} icon={faLock} color='white' />
                <FontAwesomeIcon className={styles.userItem} onClick={() => deleteItem(user.id)} icon={faTrash} color='white' />
              </li>
            ))}
          </ul>
        }
      </div>
      <div className={styles.actions}><Link href="/add_user">Add User</Link></div>
    </div>
  );
}
