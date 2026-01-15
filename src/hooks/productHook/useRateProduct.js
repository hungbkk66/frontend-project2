import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from '@/lib/api'; // Hàm API bạn vừa viết
import toast from 'react-hot-toast';

const useRateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success('Đánh giá sản phẩm thành công!');
      // Refresh lại danh sách đơn hàng (để có thể ẩn nút đánh giá nếu muốn)
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
      queryClient.invalidateQueries({ queryKey: ['topExpensiveProducts'] });
      queryClient.invalidateQueries({ queryKey: ['topCheapestProducts'] });
      queryClient.invalidateQueries({ queryKey: ['topRatedProducts'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Lỗi khi đánh giá');
    },
  });
};

export default useRateProduct;
