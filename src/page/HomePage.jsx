import React, { useState, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ArrowDownWideNarrow,
  Star,
} from 'lucide-react';

// --- Import Hooks ---
// Đảm bảo đường dẫn import đúng với cấu trúc dự án của bạn
import useTopExpensiveProducts from '@/hooks/productHook/useTopExpensiveProducts';
import useTopCheapestProducts from '@/hooks/productHook/useTopCheapestProducts';
import useTopRatedProducts from '@/hooks/productHook/useTopRatedProducts';

// --- Hàm xử lý dữ liệu an toàn ---
const getSafeList = (data) => {
  // 1. Nếu API mới của bạn trả về mảng trực tiếp -> Return luôn
  if (Array.isArray(data)) return data;

  // 2. Các trường hợp dự phòng (nếu API khác chưa sửa kịp)
  if (!data) return [];
  if (data.products && Array.isArray(data.products)) return data.products;
  if (data.data && Array.isArray(data.data)) return data.data;

  return [];
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

// Dữ liệu Category (Giữ nguyên)
const categories = [
  {
    name: 'Thời trang',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdgFFHeyxkwCTqF56a0rBZCGMkqL5jXtuNQiiOaZnMcLPWJEkF-UvpFSIqfql5_oR8PP8ZBA-ql9TvhzWeLOiSy8CVhCyjSffmofDRLR1pnJIaihUZyJutMpmQnN_5TFadX3AwjP4wlzPAU_gu-sYOL_brfEnEUBToJw573WZWgGaCCDWvYv8qhzaPAEgRz9XESa8NJ9yYGqbVLqEW8Tr936ojJnn_A9VKUwznYtacuNYxzTef5WXPQSJCjhh2I7F8ABsq56vIbaE',
    query: 'Thời trang',
  },
  {
    name: 'Mỹ phẩm',
    image:
      'https://innovativehub.com.vn/wp-content/uploads/2023/06/phat-trien-nganh-my-pham-1200x800.jpg',
    query: 'Mỹ phẩm & Chăm sóc cá nhân',
  },
  {
    name: 'Đồ điện tử',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrDN97oJkvXKMzdXSFWOCLshfFXDkFB786OzlYDYMsWLUP0Hu65gbWhKayznABELEuMosrMZGgxANtEVVLG2rsWLgs82_slE5gkavCZvjcm-WFkxqPeDsO46erYHnzyznUkK7TQEk7wiGVoa4e9TI4nKnn2w29KdYE5LlwNwTwxQxn0MmFA6jKMcaPCN-U3utgsjZNAaVyc9J9GbQLY3Qc7s3xPN_bRg2jVwWsjKAnWD_6WOwTxh-CrVX0wNfWMnrrlAkQ9uXNh4M',
    query: 'Đồ điện tử',
  },
  {
    name: 'Nội thất',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfCbssId2ISd_zzyHYA3ZciYq-atNWjbwon6r_pCU5dlvYH7PFB1scq9B8Sdx3vVGE-4BpTYVq3ds5pw8PgpSfSgCyyXZ9zCt0Bs2byKwrLvKMVoawgit73mJci37-PEG8fU6Rf2tqaXtX_PPprES-aDYAIpvwJScwWEUrG9gjKIye5WDoDc6BhOEjIK7h4_ZwbORmNFaBoNgac7VfzqYmQmwm2CkfrmTwUD4xdYhKnvNaYZQ0_EBbcv46TPZHg2FZM7q0jD6YLDs',
    query: 'Nội thất và đồ gia dụng',
  },
  {
    name: 'Thực phẩm',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb2PD3cY_NOjpNf2SHIZBqU2jxB3NHamwPow&s',
    query: 'Thực phẩm & Đồ uống',
  },
  {
    name: 'Thể thao',
    image: 'https://novida.vn/wp-content/uploads/2022/10/qe.jpg',
    query: 'Thể thao',
  },
  {
    name: 'Sách',
    image:
      'https://sonca.vn/wp-content/uploads/2023/07/van-phong-pham-la-gi-van-phong-pham-nghia-la-gi-595x400.png',
    query: 'Sách & Văn phòng phẩm',
  },
];

// --- Component Card Product ---
const ProductCard = ({ product }) => {
  // Safe access các trường dữ liệu
  const imageUrl =
    product.imageUrl ||
    product.image ||
    'https://via.placeholder.com/300x200?text=No+Image';

  // Xử lý Rating
  let ratingValue = 0;
  let ratingCount = 0;

  if (typeof product.rating === 'number') {
    ratingValue = product.rating;
    ratingCount = Math.floor(Math.random() * 50) + 10;
  } else if (product.rating && typeof product.rating === 'object') {
    ratingValue = product.rating.average || 0;
    ratingCount = product.rating.count || 0;
  }

  return (
    <div className="group flex flex-col gap-2 h-full bg-white rounded-lg p-2 hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* --- 1. BỌC LINK CHO HÌNH ẢNH --- */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/3]">
        <Link to={`/products/${product._id}`} className="block h-full w-full">
          <img
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageUrl}
            alt={product.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Error';
            }}
          />
        </Link>

        {/* Nút thêm giỏ hàng nằm đè lên ảnh, nên để ngoài Link để tránh click nhầm */}
        <Button
          variant="default"
          size="icon"
          className="absolute bottom-3 right-3 size-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-10"
          onClick={(e) => {
            e.preventDefault(); // Ngăn chặn chuyển trang khi bấm nút giỏ hàng
            // Logic thêm vào giỏ hàng ở đây
            console.log('Add to cart', product._id);
          }}
        >
          <ShoppingCart className="size-5" />
        </Button>
      </div>

      <div className="flex flex-col flex-1 justify-between mt-2">
        {/* --- 2. BỌC LINK CHO TÊN SẢN PHẨM --- */}
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-primary transition-colors text-sm sm:text-base h-10 leading-5">
            {product.name}
          </h3>
        </Link>

        {/* Tên Shop - Có thể thêm Link shop nếu muốn */}
        <p className="text-xs text-gray-400 truncate mt-1">
          {product.shop?.name || 'Cửa hàng uy tín'}
        </p>

        {/* Giá và Rating - Thường thì click vào đây cũng nên chuyển trang */}
        <Link
          to={`/products/${product._id}`}
          className="mt-2 flex items-center justify-between group-hover:opacity-80"
        >
          <p className="text-primary font-bold text-base sm:text-lg">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center text-xs text-yellow-500 font-medium bg-yellow-50 px-1.5 py-0.5 rounded">
            <span>★ {ratingValue.toFixed(1)}</span>
            {ratingCount > 0 && (
              <span className="text-gray-400 ml-1">({ratingCount})</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

// Skeleton Loading
const ProductSkeleton = () => (
  <div className="flex flex-col gap-2 p-2">
    <div className="aspect-[4/3] rounded-lg bg-gray-200 animate-pulse" />
    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
    <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const scrollContainerRef = useRef(null);

  // --- STATE TAB ---
  // Mặc định hiển thị tab "Đánh giá cao"
  const [filterType, setFilterType] = useState('rated'); // 'expensive' | 'cheapest' | 'rated'

  // --- GỌI HOOK ---
  const { data: expensiveData, isLoading: loadingExp } =
    useTopExpensiveProducts();
  const { data: cheapestData, isLoading: loadingCheap } =
    useTopCheapestProducts();
  const { data: ratedData, isLoading: loadingRated } = useTopRatedProducts();

  // --- XỬ LÝ DỮ LIỆU ---
  // Hàm getSafeList sẽ tự động xử lý mảng trả về từ API mới của bạn
  const expensiveProducts = getSafeList(expensiveData);
  const cheapestProducts = getSafeList(cheapestData);
  const ratedProducts = getSafeList(ratedData);

  // Chọn data hiển thị dựa trên tab
  let displayProducts = [];
  let isLoading = false;

  switch (filterType) {
    case 'expensive':
      displayProducts = expensiveProducts;
      isLoading = loadingExp;
      break;
    case 'cheapest':
      displayProducts = cheapestProducts;
      isLoading = loadingCheap;
      break;
    case 'rated':
      displayProducts = ratedProducts;
      isLoading = loadingRated;
      break;
    default:
      displayProducts = [];
  }

  const handleSearch = () => {
    if (!searchKeyword.trim()) return;
    navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main className="flex-1 bg-gray-50 min-h-screen pb-20">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Hero Section */}
      <section className="w-full">
        <div className="p-4 lg:p-6">
          <div
            className="flex min-h-[50vh] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 text-center relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop")`,
            }}
          >
            <div className="flex flex-col gap-3 max-w-2xl z-10">
              <h1 className="text-white text-3xl sm:text-5xl font-black tracking-tight">
                Phong Cách Của Bạn
              </h1>
              <p className="text-white/90 text-base sm:text-lg">
                Khám phá bộ sưu tập mới nhất với ưu đãi hấp dẫn ngay hôm nay.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-2 z-10">
              <Input
                placeholder="Tìm kiếm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-white/95 border-none shadow-lg h-12"
              />
              <Button onClick={handleSearch} className="h-12 px-6 shadow-lg">
                Tìm
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Slider */}
      <section className="py-8">
        <div className="max-w-[1400px] mx-auto px-4 relative group">
          <div className="flex justify-between items-end mb-4 px-2">
            <h2 className="text-2xl font-bold text-gray-900">Danh Mục</h2>
            <div className="hidden md:flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('left')}
                className="rounded-full h-8 w-8 hover:bg-gray-100"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('right')}
                className="rounded-full h-8 w-8 hover:bg-gray-100"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory px-2"
          >
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/search?category=${category.query}`}
                className="flex-shrink-0 w-[160px] sm:w-[200px] snap-start"
              >
                <div className="group relative overflow-hidden rounded-xl aspect-[3/4] w-full shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url("${category.image}")` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <p className="text-white font-bold text-lg truncate">
                      {category.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-8 bg-white shadow-sm my-4 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* Header & Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="text-primary w-7 h-7" />
                Sản Phẩm Nổi Bật
              </h2>
              <p className="text-gray-500 text-sm mt-1 ml-9">
                Tuyển chọn những sản phẩm tốt nhất dành cho bạn
              </p>
            </div>

            <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 rounded-lg self-start lg:self-auto">
              <button
                onClick={() => setFilterType('rated')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  filterType === 'rated'
                    ? 'bg-white text-yellow-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Star className="w-4 h-4" />
                Đánh giá cao
              </button>

              <button
                onClick={() => setFilterType('expensive')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  filterType === 'expensive'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Giá cao nhất
              </button>

              <button
                onClick={() => setFilterType('cheapest')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  filterType === 'cheapest'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <ArrowDownWideNarrow className="w-4 h-4" />
                Giá tốt nhất
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {/* Loading */}
            {isLoading &&
              Array.from({ length: 10 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}

            {/* Empty Data */}
            {!isLoading && displayProducts.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                <p className="text-gray-400 text-lg">Chưa có sản phẩm nào.</p>
              </div>
            )}

            {/* List Products */}
            {!isLoading &&
              displayProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
