// components/ShopOwnerMenu.jsx
import { ShieldCheck } from 'lucide-react'; // Icon khác cho Admin
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import useLogout from '@/hooks/useLogout';

const ShopOwnerMenu = ({ user }) => {
  const { logoutMutation } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-red-500 gap-2 text-red-600">
        <ShieldCheck className="text-red-600" />
        Admin: {user?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            Hồ sơ cá nhân
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/user-shop" className="font-bold hover:text-red-500 w-full">
            Quản lý cửa hàng
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/manage-orders"
            className="font-bold hover:text-red-500 w-full"
          >
            Quản lý đơn hàng
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logoutMutation()}
            className="flex flex-1 font-bold bg-red-500 hover:bg-red-600"
          >
            Đăng xuất
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShopOwnerMenu;
