import { User } from "@prisma/client";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { toast } from "react-toastify";


export const fetchUserList = createAppAsyncThunk(
  'user/fetchUserList',
  async () => {
    const response = await fetch('/api/users');

    if(!response.ok) {
      toast.error('Error fetching user list');
      throw new Error('Error fetching user list');
    }

    return await response.json()
  }
);

export const createUser = createAppAsyncThunk(
  'user/createUser',
  async (name: string) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok) { 
      throw new Error('Error creating user');
    }

    toast.success('User created successfully');

    return await response.json()
  }
);

export const deleteUser = createAppAsyncThunk(
  'user/deleteUser',
  async (id: string) => {
    const response = await fetch(`/api/users/`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok) { 
      throw new Error('Error deleting user');
    }

    toast.success('User deleted successfully');

    return id;
  }
);

export const editUser = createAppAsyncThunk(
  'user/editUser',
  async ({ id, name }: Partial<User>) => {
    const response = await fetch(`/api/users`, {
      method: 'PUT',
      body: JSON.stringify({ id, name }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!response.ok) {
      throw new Error('Error editing user');
    }

    toast.success('User edited successfully');

    return await response.json()
  }
)