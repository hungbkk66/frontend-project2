import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '@/lib/api';

export const useSearchProducts = ({ keyword, category }) => {
  return useQuery({
    queryKey: ['search-products', keyword, category],
    queryFn: () => searchProducts({ keyword, category }),
    enabled: !!keyword || !!category,
  });
};
