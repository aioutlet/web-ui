import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeftIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import bffClient from '../api/bffClient';
import { useAuthStore } from '../store/authStore';

const AccountPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, updateUser } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: profileResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await bffClient.get('/api/user/profile');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Backend returns user object directly, not wrapped in { user: ... }
  const profileData = useMemo(
    () => profileResponse || user || {},
    [profileResponse, user]
  );

  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: 'prefer-not-to-say',
  });

  // Sync profile data from backend to Zustand store
  useEffect(() => {
    if (profileResponse) {
      updateUser(profileResponse);
    }
  }, [profileResponse, updateUser]);

  useEffect(() => {
    if (profileData) {
      setProfileForm({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        email: profileData.email || '',
        phoneNumber: profileData.phoneNumber || '',
        dateOfBirth: profileData.dateOfBirth || '',
        gender: profileData.gender || 'prefer-not-to-say',
      });
    }
  }, [profileData]);

  const updateProfileMutation = useMutation({
    mutationFn: async profileData => {
      const response = await bffClient.put('/api/user/profile', profileData);
      return response.data;
    },
    onSuccess: data => {
      // Update both React Query cache and Zustand store
      queryClient.invalidateQueries(['userProfile']);

      // Update the Zustand auth store with the new user data
      // Backend returns user object directly
      updateUser(data);

      setSaveMessage('Profile updated successfully!');
      setErrorMessage('');
      setIsEditing(false);
      setTimeout(() => setSaveMessage(''), 3000);
    },
    onError: error => {
      setErrorMessage(
        error.response?.data?.message || 'Failed to update profile'
      );
      setTimeout(() => setErrorMessage(''), 5000);
    },
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSaveMessage('');
    setErrorMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveMessage('');
    setErrorMessage('');
    setProfileForm({
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      email: profileData.email || '',
      phoneNumber: profileData.phoneNumber || '',
      dateOfBirth: profileData.dateOfBirth || '',
      gender: profileData.gender || 'prefer-not-to-say',
    });
  };

  const handleSave = e => {
    e.preventDefault();
    updateProfileMutation.mutate(profileForm);
  };

  const handleBack = () => {
    navigate('/account');
  };

  if (error) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
            <p className="text-red-800 dark:text-red-300">
              Failed to load profile. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
      <div className="absolute -inset-y-8 inset-x-0 bg-gradient-to-b from-indigo-50/20 via-transparent to-indigo-50/20 dark:from-indigo-900/5 dark:to-indigo-900/5" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="font-medium">Back to Account</span>
        </button>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 uppercase tracking-wide">
              Profile Settings
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Your
            </span>{' '}
            <span className="text-gray-900 dark:text-white">Profile</span>
          </h1>
          <p className="text-lg leading-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your personal information and account details
          </p>
        </div>

        {saveMessage && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
            <p className="text-sm text-green-800 dark:text-green-300">
              {saveMessage}
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-300">
              {errorMessage}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSave}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Personal Information
            </h2>
            {!isEditing && (
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors duration-200"
              >
                <PencilIcon className="h-5 w-5" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {!isLoading && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileForm.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                      isEditing
                        ? 'border-gray-300 dark:border-gray-600'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileForm.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                      isEditing
                        ? 'border-gray-300 dark:border-gray-600'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    isEditing
                      ? 'border-gray-300 dark:border-gray-600'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profileForm.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="(555) 123-4567"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                    isEditing
                      ? 'border-gray-300 dark:border-gray-600'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profileForm.dateOfBirth}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                      isEditing
                        ? 'border-gray-300 dark:border-gray-600'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={profileForm.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${
                      isEditing
                        ? 'border-gray-300 dark:border-gray-600'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed'
                    }`}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckIcon className="h-5 w-5" />
                    <span>
                      {updateProfileMutation.isPending
                        ? 'Saving...'
                        : 'Save Changes'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
