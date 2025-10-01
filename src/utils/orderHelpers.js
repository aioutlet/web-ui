// Pure utility functions for order data manipulation
// These are stateless helpers that can be used anywhere in the app

export const getOrderById = (orders, orderId) => {
  return orders.find(order => order.id === orderId);
};

export const getOrdersByStatus = (orders, status) => {
  if (status === 'all') return orders;
  return orders.filter(
    order => order.status.toLowerCase() === status.toLowerCase()
  );
};

export const getOrdersByTimeRange = (orders, timeFilter) => {
  const now = new Date();

  return orders.filter(order => {
    const orderDate = new Date(order.placedDate);
    const orderYear = orderDate.getFullYear();

    switch (timeFilter) {
      case 'past-3-months':
        const threeMonthsAgo = new Date(now);
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        return orderDate >= threeMonthsAgo;
      case '2025':
      case '2024':
      case '2023':
        return orderYear === parseInt(timeFilter);
      case 'all-time':
      default:
        return true;
    }
  });
};

export const searchOrders = (orders, searchTerm) => {
  if (!searchTerm) return orders;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return orders.filter(
    order =>
      order.id.toLowerCase().includes(lowerSearchTerm) ||
      order.items.some(
        item =>
          item.title.toLowerCase().includes(lowerSearchTerm) ||
          item.description.toLowerCase().includes(lowerSearchTerm)
      )
  );
};

export const filterOrders = (orders, searchTerm, statusFilter, timeFilter) => {
  let filtered = [...orders];

  // Apply status filter
  if (statusFilter && statusFilter !== 'all') {
    filtered = getOrdersByStatus(filtered, statusFilter);
  }

  // Apply time filter
  if (timeFilter && timeFilter !== 'all-time') {
    filtered = getOrdersByTimeRange(filtered, timeFilter);
  }

  // Apply search filter
  if (searchTerm) {
    filtered = searchOrders(filtered, searchTerm);
  }

  return filtered;
};

export const getTotalOrdersCount = orders => {
  return orders.length;
};

export const getOrdersByStatusCount = (orders, status) => {
  return getOrdersByStatus(orders, status).length;
};

export const getOrderPrimaryImage = order => {
  if (!order || !order.items || order.items.length === 0) {
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center';
  }
  return order.items[0].image;
};

export const getOrderDisplayInfo = order => {
  if (!order || !order.items || order.items.length === 0) {
    return {
      primaryImage: getOrderPrimaryImage(order),
      itemCount: 0,
      firstItemTitle: 'Unknown Item',
      additionalItemsCount: 0,
    };
  }

  const itemCount = order.items.length;
  const firstItemTitle = order.items[0].title;
  const additionalItemsCount = itemCount - 1;

  return {
    primaryImage: order.items[0].image,
    itemCount,
    firstItemTitle,
    additionalItemsCount,
  };
};
