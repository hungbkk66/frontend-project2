import { useQuery } from '@tanstack/react-query';
import { getMyCart } from '@/lib/api';

export const useMyCart = () => {
  return useQuery({
    queryKey: ['my-cart'],
    queryFn: getMyCart,
  });
};
