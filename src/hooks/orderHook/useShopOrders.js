import { useQuery } from '@tanstack/react-query';
import { getShopOrders } from '@/lib/api';

const useShopOrders = () => {
  return useQuery({
    queryKey: ['shop-orders'],
    queryFn: getShopOrders,
  });
};

export default useShopOrders;
