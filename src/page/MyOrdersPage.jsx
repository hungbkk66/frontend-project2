import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Store,
  CalendarDays,
  Loader2,
  Star, // Icon ngôi sao
} from 'lucide-react';
import { Button } from '../components/ui/button';
import useMyOrders from '@/hooks/orderHook/useMyOrders';
import useUpdateOrderStatus from '@/hooks/orderHook/useUpdateOrderStatus';
import RateProductModal from '@/components/RateProductModal';

const MyOrdersPage = () => {
  const { data: orders, isLoading, isError } = useMyOrders();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus();

  // --- STATE QUẢN LÝ MODAL ĐÁNH GIÁ ---
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Hàm mở modal đánh giá cho 1 sản phẩm cụ thể
  const handleOpenReview = (product, orderId) => {
    setSelectedProduct(product);
    setSelectedOrderId(orderId);
    setIsReviewOpen(true);
  };

  // Hàm xác nhận đã nhận hàng
  const handleReceiveOrder = (orderId) => {
    if (
      window.confirm('Bạn xác nhận đã nhận được hàng và hài lòng với sản phẩm?')
    ) {
      updateStatus({ orderId, status: 'received' });
    }
  };

  // --- HELPER FORMAT ---
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
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

  const renderStatus = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm border border-yellow-100">
            <Clock className="w-4 h-4" /> Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm border border-blue-100">
            <CheckCircle className="w-4 h-4" /> Confirmed
          </span>
        );
      case 'shipping':
        return (
          <span className="flex items-center gap-1 text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-sm border border-purple-100">
            <Truck className="w-4 h-4" /> Shipping
          </span>
        );
      case 'delivered':
        return (
          <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm border border-orange-100">
            <Package className="w-4 h-4" /> Delivered
          </span>
        );
      case 'received':
        return (
          <span className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm border border-green-200 font-bold">
            <CheckCircle className="w-4 h-4" /> Received
          </span>
        );
      case 'canceled':
        return (
          <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm border border-red-100">
            <XCircle className="w-4 h-4" /> Canceled
          </span>
        );
      default:
        return status;
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
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
              {/* HEADER: Shop Info & Status */}
              <div className="p-4 border-b bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-gray-800">
                    <Store className="w-4 h-4 text-gray-500" />
                    <span className="font-bold">{order.shop?.name}</span>
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

              {/* BODY: List Items */}
              <div className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 flex gap-4 hover:bg-gray-50/30 transition"
                  >
                    <img
                      src={item.product?.imageUrl}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          to={`/product/${item.product?._id}`}
                          className="font-medium text-gray-900 line-clamp-2 hover:text-primary"
                        >
                          {item.product?.name}
                        </Link>

                        {/* --- NÚT ĐÁNH GIÁ (Nằm cạnh từng sản phẩm) --- */}
                        {order.status === 'received' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="shrink-0 text-xs h-8 border-orange-200 text-orange-600 hover:bg-orange-50"
                            onClick={() =>
                              handleOpenReview(item.product, order._id)
                            }
                          >
                            <Star className="w-3 h-3 mr-1" /> Đánh giá
                          </Button>
                        )}
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        <span className="text-sm text-gray-500">
                          x{item.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER: Total & Confirm Received */}
              <div className="p-4 bg-gray-50 border-t flex flex-col sm:flex-row justify-end items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Thành tiền:</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>

                {/* Chỉ hiện nút xác nhận khi Shop đã giao hàng (delivered) */}
                {order.status === 'delivered' && (
                  <Button
                    onClick={() => handleReceiveOrder(order._id)}
                    disabled={isUpdating}
                    className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Đã nhận được hàng
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL ĐÁNH GIÁ --- */}
      <RateProductModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        product={selectedProduct}
        orderId={selectedOrderId}
      />
    </div>
  );
};

export default MyOrdersPage;
