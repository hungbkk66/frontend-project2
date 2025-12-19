import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../../lib/api';

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    },
  });
};

export default useUpdateProduct;
