import { useQuery } from '@tanstack/react-query';
import { getCategoryIdByName } from '@/lib/api';

const useCategoryIdByName = (categoryName) => {
  return useQuery({
    queryKey: ['categoryIdByName', categoryName],
    queryFn: () => getCategoryIdByName(categoryName),
    enabled: !!categoryName, // chỉ fetch khi có name
  });
};

export default useCategoryIdByName;
