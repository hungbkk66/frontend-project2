import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../lib/api';

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
      queryClient.invalidateQueries({ queryKey: ['topExpensiveProducts'] });
      queryClient.invalidateQueries({ queryKey: ['topCheapestProducts'] });
      queryClient.invalidateQueries({ queryKey: ['topRatedProducts'] });
    },
  });
};

export default useCreateProduct;
