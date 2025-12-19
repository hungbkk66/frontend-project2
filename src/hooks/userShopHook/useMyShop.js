import { useQuery } from '@tanstack/react-query';
import { getMyShop } from '../../lib/api';

const useMyShop = () => {
  return useQuery({
    queryKey: ['myShop'],
    queryFn: getMyShop,
    retry: false,
  });
};

export default useMyShop;
