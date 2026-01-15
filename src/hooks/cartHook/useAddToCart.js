import { useMutation } from '@tanstack/react-query';
import { addToCartApi } from '@/lib/api';

export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCartApi,
  });
};
