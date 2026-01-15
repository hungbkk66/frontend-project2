import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeCartItem } from '@/lib/api';

const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      // refresh cart
      queryClient.invalidateQueries({ queryKey: ['my-cart'] });
      queryClient.invalidateQueries({ queryKey: ['cartGroupedByShop'] });
    },
  });
};

export default useRemoveCartItem;
