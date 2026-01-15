import { useQuery } from '@tanstack/react-query';
import { getTopExpensiveProducts } from '@/lib/api';

const useTopExpensiveProducts = () => {
  return useQuery({
    queryKey: ['topExpensiveProducts'],
    queryFn: getTopExpensiveProducts,
  });
};

export default useTopExpensiveProducts;
