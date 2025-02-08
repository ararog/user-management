
import { useState, useEffect, useCallback } from 'react';
import { faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from '@/models/User';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/helpers/api';
import UserItem from '@/ui/components/UserItem';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [deletingId, setDeletingId] = useState(0);
  const router = useRouter();

  async function fetchUsers() {
    const res = await apiClient('/api/users')
    const data = await res.json()
    setUsers(data)
    setDeletingId(0)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const updatePassword = useCallback((id: number) => {
    router.push(`/user/password/change/${id}`);
  }, [users]);

  const deleteItem = useCallback(async (id: number) => {
    const isConfirmed = confirm('Are you sure you want to delete this user?');
    setDeletingId(id);
    if (isConfirmed) {
      await apiClient(`/api/users/${id}`, {
        method: 'DELETE'
      });
      fetchUsers();
    }
  }, [users]);

  return (
    <ul>
      {users?.length === 0 ? <div>No users</div> : users.map((user) => 
        <UserItem key={user.id} 
          deleting={user.id === deletingId}
          onUpdateClick={() => updatePassword(user.id)} updateIcon={faLock}
          onDeleteClick={() => deleteItem(user.id)} deleteIcon={faTrash}
        >
          <div className="">{user.name}</div>
        </UserItem>
      )}
    </ul>
  )
}