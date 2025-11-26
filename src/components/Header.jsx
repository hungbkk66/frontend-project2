import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, ShoppingBag, User, Zap } from 'lucide-react';
import useAuthUser from '../hooks/useAuthUser';
import UsernameMenu from './UsernameMenu';

const Header = () => {
  const { authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm w-full">
      <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-10 py-3">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-charcoal dark:text-light-gray"
          >
            <Zap className="size-6 text-primary" />{' '}
            {/* Thay thế SVG logo bằng Lucide icon */}
            <h2 className="text-xl font-bold tracking-tight">Shop online</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-9">
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              to="/shop"
            >
              Shop
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              to="/categories"
            >
              Categories
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              to="/about"
            >
              About
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              to="/contact"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
          {/* Thanh tìm kiếm */}
          <div className="hidden sm:flex relative items-center">
            <Search className="absolute left-3 size-5 text-gray-500" />
            <Input
              className="pl-10"
              placeholder="Search products..."
              type="search"
            />
          </div>

          {/* Nút tìm kiếm (Mobile) */}
          <Button variant="icon" size="icon" className="flex sm:hidden">
            <Search className="size-5" />
          </Button>

          {/* Logic Đăng nhập/Đăng xuất */}
          {isAuthenticated ? (
            <>
              {/* ĐÃ ĐĂNG NHẬP: Hiển thị Giỏ hàng và UsernameMenu */}
              {/* Nút Giỏ hàng */}
              <Button variant="icon" size="icon">
                <ShoppingBag className="size-5" />
              </Button>
              <UsernameMenu user={authUser} />
            </>
          ) : (
            // CHƯA ĐĂNG NHẬP: Hiển thị Login/Signup Buttons
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
