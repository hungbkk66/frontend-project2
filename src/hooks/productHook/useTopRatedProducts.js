import { useQuery } from '@tanstack/react-query';
import { getTopRatedProducts } from '@/lib/api';

const useTopRatedProducts = () => {
  return useQuery({
    queryKey: ['topRatedProducts'],
    queryFn: getTopRatedProducts,
  });
};

export default useTopRatedProducts;
