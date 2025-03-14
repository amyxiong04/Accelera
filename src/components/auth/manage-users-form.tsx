'use client';

import { useState } from 'react';
import { updateUser } from '@/actions/users/update-user';
import { removeUser } from '@/actions/users/remove-user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ManageUsersForm() {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdateEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('oldEmail', oldEmail);
    formData.append('newEmail', newEmail);

    const result = await updateUser(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccessMessage('Email updated successfully!');
      setNewEmail('');
    }
  };

  const handleDeleteUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('oldEmail', oldEmail);

    const result = await removeUser(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccessMessage('User deleted successfully!');
      setOldEmail('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 text-black">
      <h1 className="text-center text-2xl font-bold mb-6">Manage Users</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

      <div className="mb-4">
        <label className="block text-sm font-medium">Old Email:</label>
        <Input
          type="email"
          name="oldEmail"
          placeholder="Enter current email"
          value={oldEmail}
          onChange={(e) => setOldEmail(e.target.value)}
          required
          className="w-full border border-black rounded-none p-2 mt-1"
        />
      </div>

      <form onSubmit={handleUpdateEmail} className="mb-4">
        <label className="block text-sm font-medium">New Email:</label>
        <Input
          type="email"
          name="newEmail"
          placeholder="Enter new email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
          className="w-full border border-black rounded-none p-2 mt-1"
        />
        <Button 
          type="submit"
          className="w-full border border-black rounded-none p-2 mt-3 bg-white text-black hover:bg-gray-100"
        >
          Update Email
        </Button>
      </form>

      <form onSubmit={handleDeleteUser}>
        <Button 
          type="submit"
          className="w-full border border-black rounded-none p-2 bg-white text-black hover:bg-gray-100"
        >
          Delete User
        </Button>
      </form>
    </div>
  );
}


