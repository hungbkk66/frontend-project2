import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '@/lib/api';

const useMyOrders = () => {
  return useQuery({
    queryKey: ['my-orders'],
    queryFn: getMyOrders,
  });
};

export default useMyOrders;
