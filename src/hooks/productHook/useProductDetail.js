import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '@/lib/api';

export const useProductDetail = (id) => {
  return useQuery({
    queryKey: ['product-detail', id],
    queryFn: () => getProductDetail(id),
    enabled: !!id,
  });
};
