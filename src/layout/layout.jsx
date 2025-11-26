import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    // Khắc phục: Đảm bảo body và container cấp cao nhất có chiều rộng đầy đủ (w-full)
    // và không có margin hoặc padding không mong muốn.
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col w-full">
        {' '}
        {/* Đảm bảo w-full ở đây */}
        <Header />
        <main className="flex-1 w-full">
          {' '}
          {/* Đảm bảo main chiếm toàn bộ chiều rộng */}
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
