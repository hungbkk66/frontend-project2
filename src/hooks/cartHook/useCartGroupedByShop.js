import { useQuery } from '@tanstack/react-query';
import { getCartGroupedByShop } from '@/lib/api';

const useCartGroupedByShop = () => {
  return useQuery({
    queryKey: ['cartGroupedByShop'],
    queryFn: getCartGroupedByShop,
  });
};

export default useCartGroupedByShop;
