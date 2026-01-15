import { useQuery } from '@tanstack/react-query';
import { getTopCheapestProducts } from '@/lib/api';

const useTopCheapestProducts = () => {
  return useQuery({
    queryKey: ['topCheapestProducts'],
    queryFn: getTopCheapestProducts,
  });
};

export default useTopCheapestProducts;
