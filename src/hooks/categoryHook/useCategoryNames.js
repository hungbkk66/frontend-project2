import { useQuery } from '@tanstack/react-query';
import { getAllCategoryNames } from '@/lib/api';

const useCategoryNames = () => {
  return useQuery({
    queryKey: ['categoryNames'],
    queryFn: getAllCategoryNames,
  });
};

export default useCategoryNames;
