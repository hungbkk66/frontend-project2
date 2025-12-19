// hooks/shopHook/useSearchShops.js
import { useQuery } from '@tanstack/react-query';
import { searchShops } from '@/api/shop';

const useSearchShops = ({
  address,
  country,
  searchQuery,
  sortOption,
  page,
}) => {
  return useQuery({
    queryKey: [
      'searchShops',
      { address, country, searchQuery, sortOption, page },
    ],
    queryFn: () =>
      searchShops({ address, country, searchQuery, sortOption, page }),
    keepPreviousData: true, // để khi đổi page không load trắng
  });
};

export default useSearchShops;
