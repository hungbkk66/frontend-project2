import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShop } from '../../lib/api';

const useUpdateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateShop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myShop'] });
    },
  });
};

export default useUpdateShop;
