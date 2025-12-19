import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShop } from '../../lib/api';

const useCreateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createShop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myShop'] });
    },
  });
};

export default useCreateShop;
