import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { userAPI } from '../api/clients/userClient';
import AddressCard from '../components/account/AddressCard';

/**
 * AddressesPage Component
 *
 * Amazon-style addresses list page (no modal)
 * Shows all saved addresses with options to add, edit, delete, set default
 */
const AddressesPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch addresses
  const {
    data: addresses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['addresses'],
    queryFn: userAPI.getAddresses,
  });

  // Delete address mutation
  const deleteAddressMutation = useMutation({
    mutationFn: userAPI.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(['addresses']);
    },
  });

  // Set default address mutation
  const setDefaultAddressMutation = useMutation({
    mutationFn: userAPI.setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(['addresses']);
    },
  });

  const handleAddNew = () => {
    navigate('/account/addresses/add');
  };

  const handleEdit = address => {
    navigate(`/account/addresses/${address._id}/edit`);
  };

  const handleDelete = addressId => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddressMutation.mutate(addressId);
    }
  };

  const handleSetDefault = addressId => {
    setDefaultAddressMutation.mutate(addressId);
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
              Failed to load addresses. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/20" />
      {/* Connecting gradient for flow */}
      <div className="absolute -inset-y-8 inset-x-0 bg-gradient-to-b from-indigo-50/20 via-transparent to-indigo-50/20 dark:from-indigo-900/5 dark:to-indigo-900/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="font-medium">Back to Account</span>
        </button>

        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 uppercase tracking-wide">
              Address Management
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-12"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Your
            </span>{' '}
            <span className="text-gray-900 dark:text-white">Addresses</span>
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {/* Header with Add Button */}
          <div className="flex justify-end items-center mb-6">
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add New Address</span>
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && addresses.length === 0 && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No addresses saved yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add your first shipping address to speed up checkout
              </p>
            </div>
          )}

          {/* Addresses Grid */}
          {!isLoading && addresses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map(address => (
                <AddressCard
                  key={address._id}
                  address={address}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSetDefault={handleSetDefault}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressesPage;
