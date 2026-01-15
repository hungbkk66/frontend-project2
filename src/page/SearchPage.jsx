// pages/SearchPage.jsx
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSearchProducts } from '@/hooks/productHook/useSearchProducts';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';

  const {
    data: products = [],
    isLoading,
    isError,
  } = useSearchProducts({ keyword, category });

  return (
    <main className="px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Kết quả tìm kiếm
        {keyword && ` cho "${keyword}"`}
        {category && ` trong danh mục "${category}"`}
      </h1>

      {isLoading && <p>Đang tìm kiếm sản phẩm...</p>}
      {isError && <p className="text-red-500">Có lỗi xảy ra</p>}

      {!isLoading && products.length === 0 && (
        <p>Không tìm thấy sản phẩm phù hợp</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/products/${p._id}`)}
            className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full aspect-[4/3] object-cover mb-2 rounded"
            />
            <h3 className="font-semibold line-clamp-2">{p.name}</h3>
            <p className="font-bold text-primary">{p.price}đ</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SearchPage;
