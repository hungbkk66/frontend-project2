import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rateProductApi } from '@/lib/api';

const useRateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rateProductApi,

    onSuccess: () => {
      // đơn giản, chắc chắn đúng
      queryClient.invalidateQueries();
    },
  });
};

export default useRateProduct;
