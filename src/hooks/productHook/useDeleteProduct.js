// hooks/productHook/useDeleteProduct.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '@/lib/api';
import toast from 'react-hot-toast';

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('Xóa sản phẩm thành công');
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
      queryClient.invalidateQueries({ queryKey: ['topExpensiveProducts'] });
      queryClient.invalidateQueries({ queryKey: ['topCheapestProducts'] });
      queryClient.invalidateQueries({ queryKey: ['topRatedProducts'] });
    },
    onError: () => {
      toast.error('Xóa sản phẩm thất bại');
    },
  });
};

export default useDeleteProduct;
