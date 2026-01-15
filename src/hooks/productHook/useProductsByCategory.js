import { useQuery } from '@tanstack/react-query';
import { getProductsByCategoryName } from '@/lib/api';

const useProductsByCategory = (categoryName) => {
  return useQuery({
    queryKey: ['productsByCategory', categoryName],
    queryFn: () => getProductsByCategoryName(categoryName),
    enabled: !!categoryName, // chỉ fetch khi có categoryName
  });
};

export default useProductsByCategory;
