import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '@/lib/api';
import toast from 'react-hot-toast';

const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,

    onSuccess: (data) => {
      toast.success('Cập nhật trạng thái thành công!');

      // 1. Làm mới danh sách đơn hàng của Shop
      queryClient.invalidateQueries({ queryKey: ['shop-orders'] });

      // 2. (Tuỳ chọn) Làm mới danh sách đơn hàng cá nhân nếu đang xem
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || 'Lỗi khi cập nhật trạng thái';
      toast.error(message);
      console.error(error);
    },
  });
};

export default useUpdateOrderStatus;
