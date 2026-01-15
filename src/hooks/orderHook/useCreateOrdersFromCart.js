import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrdersFromCart } from '@/lib/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useCreateOrderFromCart = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createOrdersFromCart,

    onSuccess: (data) => {
      // data chính là json trả về từ Backend: { success: true, orders: [...], payUrl: "..." }

      // 1. Làm mới giỏ hàng (vì đơn hàng đã tạo thành công trong DB)
      queryClient.invalidateQueries({ queryKey: ['my-cart'] });
      queryClient.invalidateQueries({ queryKey: ['cartGroupedByShop'] });

      // 2. Kiểm tra logic điều hướng
      if (data.payUrl) {
        // TRƯỜNG HỢP CÓ THANH TOÁN MOMO
        toast.loading('Đang chuyển sang cổng thanh toán MoMo...', {
          duration: 2000,
        });

        // Chờ 1 chút cho toast hiện rồi chuyển trang
        setTimeout(() => {
          window.location.href = data.payUrl;
        }, 1000);
      } else {
        // TRƯỜNG HỢP KHÔNG CÓ MOMO (hoặc lỗi lấy link)
        toast.success('Đặt hàng thành công! 🎉');
        navigate('/my-orders');
      }
    },

    onError: (error) => {
      const msg = error.response?.data?.message || 'Đặt hàng thất bại';
      toast.error(msg);
    },
  });
};

export default useCreateOrderFromCart;
