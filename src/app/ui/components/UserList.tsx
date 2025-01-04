
import { useState, useEffect, useCallback } from 'react';
import { faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from '@/models/User';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/helpers/api';
import UserItem from '@/ui/components/UserItem';

type UserListProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemStyle: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemActionStyle: any
}

export default function UserList(props: UserListProps) {
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
    router.push(`/user/change_password/${id}`);
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
          style={props.itemStyle}
          actionStyle={props.itemActionStyle}
          deleting={user.id === deletingId}
          onUpdateClick={() => updatePassword(user.id)} updateIcon={faLock}
          onDeleteClick={() => deleteItem(user.id)} deleteIcon={faTrash}
        >
          <div className={props.itemStyle}>{user.name}</div>
        </UserItem>
      )}
    </ul>
  )
}