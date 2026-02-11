import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowPathIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import returnsAPI from '../api/returnsAPI';

// Status badge colors
const STATUS_COLORS = {
  Requested: 'bg-blue-100 text-blue-800',
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  ItemsReceived: 'bg-yellow-100 text-yellow-800',
  Inspecting: 'bg-purple-100 text-purple-800',
  Completed: 'bg-indigo-100 text-indigo-800',
  RefundProcessed: 'bg-green-100 text-green-800',
};

const ReturnsPage = () => {
  const navigate = useNavigate();
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await returnsAPI.getMyReturns();
      setReturns(data);
    } catch (err) {
      console.error('❌ Failed to fetch returns:', err);
      setError(
        err.response?.data?.message || err.message || 'Failed to load returns'
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter returns by status
  const filteredReturns =
    statusFilter === 'all'
      ? returns
      : returns.filter(ret => ret.status === statusFilter);

  // Get unique statuses from returns
  const availableStatuses = [...new Set(returns.map(ret => ret.status))];

  // Format date
  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Returns</h1>
          <p className="text-gray-600 mt-2">
            Track and manage your return requests
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start mb-6">
            <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error loading returns</p>
              <p className="text-sm mt-1">{error}</p>
              <button
                onClick={fetchReturns}
                className="text-sm underline mt-2 hover:text-red-900"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Status Filter */}
        {returns.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center space-x-4">
              <label className="font-medium text-gray-700">
                Filter by status:
              </label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Returns ({returns.length})</option>
                {availableStatuses.map(status => (
                  <option key={status} value={status}>
                    {status} (
                    {returns.filter(ret => ret.status === status).length})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Empty State */}
        {returns.length === 0 && !error && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ArrowPathIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Returns Yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't requested any returns
            </p>
            <button
              onClick={() => navigate('/orders')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              View My Orders
            </button>
          </div>
        )}

        {/* Returns List */}
        {filteredReturns.length > 0 && (
          <div className="space-y-4">
            {filteredReturns.map(returnItem => (
              <div
                key={returnItem.id}
                onClick={() => navigate(`/returns/${returnItem.id}`)}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Return #{returnItem.returnNumber}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[returnItem.status] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {returnItem.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Order #{returnItem.orderNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Requested</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(returnItem.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Return Items */}
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-3">
                      {returnItem.items.length} item
                      {returnItem.items.length !== 1 && 's'} •{' '}
                      {returnItem.reason}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {returnItem.items.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          {item.productImageUrl && (
                            <img
                              src={item.productImageUrl}
                              alt={item.productName}
                              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.productName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantityToReturn}
                            </p>
                          </div>
                        </div>
                      ))}
                      {returnItem.items.length > 3 && (
                        <div className="flex items-center justify-center text-sm text-gray-500">
                          +{returnItem.items.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Refund Amount */}
                  {returnItem.totalRefundAmount > 0 && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Refund Amount:</span>
                        <span className="text-lg font-bold text-green-600">
                          ${returnItem.totalRefundAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Rejection Reason */}
                  {returnItem.status === 'Rejected' &&
                    returnItem.rejectionReason && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Rejection Reason:</span>{' '}
                          {returnItem.rejectionReason}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results after filtering */}
        {returns.length > 0 && filteredReturns.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ExclamationCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Returns Found
            </h2>
            <p className="text-gray-600 mb-6">
              No returns match the selected status filter
            </p>
            <button
              onClick={() => setStatusFilter('all')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Show All Returns
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnsPage;
