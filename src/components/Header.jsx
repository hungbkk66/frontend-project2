import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Search, ShoppingBag, Zap } from 'lucide-react';

// Hooks
import useAuthUser from '../hooks/useAuthUser';

// Components
import UsernameMenu from './UsernameMenu';
import ShopOwnerMenu from './ShopOwnerMenu'; // <--- Import component menu cho admin

const Header = () => {
  const { authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);

  // Kiểm tra role (Giả sử field trong DB là 'role' và giá trị là 'admin')
  const isAdmin = authUser?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm w-full">
      <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-10 py-3">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-charcoal dark:text-light-gray"
          >
            <Zap className="size-6 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">Shop online</h2>
          </Link>

          {/* Navigation links - Có thể ẩn bớt nếu là Admin tuỳ nhu cầu */}
          <nav className="hidden md:flex items-center gap-9">
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              to="/about"
            >
              About us
            </Link>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
          <Button variant="icon" size="icon" className="flex sm:hidden">
            <Search className="size-5" />
          </Button>

          {/* --- LOGIC ĐIỀU HƯỚNG HIỂN THỊ --- */}
          {isAuthenticated ? (
            // TRƯỜNG HỢP 1: LÀ ADMIN
            isAdmin ? (
              <ShopOwnerMenu user={authUser} />
            ) : (
              // TRƯỜNG HỢP 2: USER THƯỜNG (Hiện Giỏ hàng + UsernameMenu)
              <>
                <Link to="/my-cart">
                  <Button variant="icon" size="icon">
                    <ShoppingBag className="size-5" />
                  </Button>
                </Link>
                <UsernameMenu user={authUser} />
              </>
            )
          ) : (
            // TRƯỜNG HỢP 3: CHƯA ĐĂNG NHẬP
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="default">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="default">
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
