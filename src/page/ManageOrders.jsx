import React, { useState } from 'react';
import {
  Package,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Phone,
  ClipboardList,
  Loader2,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import useShopOrders from '@/hooks/orderHook/useShopOrders';
import useUpdateOrderStatus from '@/hooks/orderHook/useUpdateOrderStatus'; // Hook Update
import toast from 'react-hot-toast';

const ManageOrders = () => {
  const { data: orders, isLoading, isError } = useShopOrders();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus(); // Khởi tạo hook update
  const [filterStatus, setFilterStatus] = useState('all');

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
          <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded text-sm font-medium">
            <Clock className="w-4 h-4" /> Chờ xác nhận
          </span>
        );
      case 'confirmed':
        return (
          <span className="flex items-center gap-1 text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded text-sm font-medium">
            <CheckCircle className="w-4 h-4" /> Đã xác nhận
          </span>
        );
      case 'paid':
        return (
          <span className="flex items-center gap-1 text-teal-600 bg-teal-50 border border-teal-200 px-2 py-1 rounded text-sm font-medium">
            <CheckCircle className="w-4 h-4" /> Đã thanh toán
          </span>
        );
      case 'delivered':
        return (
          <span className="flex items-center gap-1 text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded text-sm font-medium">
            <Package className="w-4 h-4" /> Giao thành công
          </span>
        );
      case 'canceled':
        return (
          <span className="flex items-center gap-1 text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded text-sm font-medium">
            <XCircle className="w-4 h-4" /> Đã hủy
          </span>
        );
      default:
        return status;
    }
  };

  // --- HÀM XỬ LÝ CẬP NHẬT TRẠNG THÁI ---
  const handleUpdateStatus = (orderId, newStatus) => {
    // Gọi mutation từ hook
    updateStatus({ orderId, status: newStatus });
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  if (isError)
    return (
      <div className="text-center p-10 text-red-500">
        Lỗi tải danh sách đơn hàng
      </div>
    );

  const displayOrders =
    filterStatus === 'all'
      ? orders
      : orders?.filter((o) => o.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ClipboardList className="w-6 h-6" /> Quản Lý Đơn Hàng
          </h1>
          <div className="text-sm text-gray-500">
            Tổng: <b>{orders?.length || 0}</b> đơn hàng
          </div>
        </div>

        {/* Filter Tabs - Bỏ 'shipping' khỏi filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
          {['all', 'pending', 'confirmed', 'delivered', 'canceled'].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filterStatus === status
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ),
          )}
        </div>

        <div className="space-y-6">
          {!displayOrders || displayOrders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed">
              <p className="text-gray-400">
                Không có đơn hàng nào ở trạng thái này.
              </p>
            </div>
          ) : (
            displayOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-4 bg-gray-50/80 border-b flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 font-bold text-gray-800">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />{' '}
                        {order.owner?.name || 'Khách lẻ'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />{' '}
                        {order.owner?.phone || 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {renderStatus(order.status)}
                    <span className="font-bold text-lg text-primary">
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 flex gap-4 hover:bg-gray-50/30"
                    >
                      <img
                        src={
                          item.product?.imageUrl ||
                          'https://via.placeholder.com/80'
                        }
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 line-clamp-1">
                          {item.product?.name}
                        </h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-500">
                            Số lượng: <b>{item.quantity}</b>
                          </span>
                          <span className="text-sm font-medium">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t bg-gray-50 flex flex-wrap justify-end gap-3">
                  {/* Logic Nút Bấm: Loại bỏ bước Shipping */}

                  {order.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleUpdateStatus(order._id, 'canceled')
                        }
                        disabled={isUpdating}
                        className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                      >
                        Từ chối
                      </Button>
                      <Button
                        onClick={() =>
                          handleUpdateStatus(order._id, 'confirmed')
                        }
                        disabled={isUpdating}
                      >
                        Xác nhận đơn
                      </Button>
                    </>
                  )}

                  {/* Nếu đã Xác nhận (hoặc đã Thanh toán MoMo) -> Hiện nút Giao Thành Công */}
                  {(order.status === 'confirmed' ||
                    order.status === 'paid') && (
                    <Button
                      onClick={() => handleUpdateStatus(order._id, 'delivered')}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isUpdating}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Đã giao xong
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
