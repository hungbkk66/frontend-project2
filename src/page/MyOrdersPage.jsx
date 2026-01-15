import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Store,
  CalendarDays,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import useMyOrders from '@/hooks/orderHook/useMyOrders';

const MyOrdersPage = () => {
  const { data: orders, isLoading, isError } = useMyOrders();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Helper hiển thị trạng thái với màu sắc
  const renderStatus = (status) => {
    const statusConfig = {
      pending: {
        color: 'text-yellow-600 bg-yellow-50 border-yellow-100',
        icon: <Clock className="w-4 h-4" />,
        text: 'Pending',
      },
      confirmed: {
        color: 'text-blue-600 bg-blue-50 border-blue-100',
        icon: <CheckCircle className="w-4 h-4" />,
        text: 'Confirmed',
      },
      shipping: {
        color: 'text-purple-600 bg-purple-50 border-purple-100',
        icon: <Truck className="w-4 h-4" />,
        text: 'Shipping',
      },
      delivered: {
        color: 'text-green-600 bg-green-50 border-green-100',
        icon: <Package className="w-4 h-4" />,
        text: 'Delivered',
      },
      canceled: {
        color: 'text-red-600 bg-red-50 border-red-100',
        icon: <XCircle className="w-4 h-4" />,
        text: 'Canceled',
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}
      >
        {config.icon} {config.text}
      </span>
    );
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );

  if (isError)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Failed to load orders
      </div>
    );

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Package className="w-16 h-16 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-700">No orders yet</h2>
        <Link to="/">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Header: Shop & Status */}
              <div className="p-4 border-b bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-gray-800">
                    <Store className="w-4 h-4 text-gray-500" />
                    <span className="font-bold">
                      {order.shop?.name || 'Shop Name'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDays className="w-3 h-3" />
                    <span>{formatDate(order.createdAt)}</span>
                    <span className="mx-1">|</span>
                    <span>ID: {order._id.slice(-6).toUpperCase()}</span>
                  </div>
                </div>
                <div>{renderStatus(order.status)}</div>
              </div>

              {/* Body: List Items */}
              <div className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 flex gap-4 hover:bg-gray-50/30 transition"
                  >
                    <img
                      src={
                        item.product?.imageUrl ||
                        'https://via.placeholder.com/100'
                      }
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/product/${item.product?._id}`}
                          className="font-medium text-gray-900 line-clamp-2 hover:text-primary transition-colors"
                        >
                          {item.product?.name}
                        </Link>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-sm text-gray-500">
                          x{item.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {item.price}đ
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer: Total & Actions */}
              <div className="p-4 bg-gray-50 border-t flex flex-col sm:flex-row justify-end items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Order Total:</span>
                  <span className="text-xl font-bold text-primary">
                    {order.totalPrice}đ
                  </span>
                </div>

                {/* Nút hành động */}
                <div className="flex gap-2 w-full sm:w-auto">
                  {/* Bạn có thể thêm trang Order Detail sau */}
                  {/* <Link to={`/order/${order._id}`} className="w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="w-full">Details</Button>
                    </Link> */}

                  {order.status === 'delivered' && (
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
                    >
                      Review
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
