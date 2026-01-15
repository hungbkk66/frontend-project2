import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useProductDetail } from '@/hooks/productHook/useProductDetail';
import { useAddToCart } from '@/hooks/cartHook/useAddToCart';

const ProductDetailPage = () => {
  const { id } = useParams();
  console.log('DETAIL PRODUCT ID =', id);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, isError } = useProductDetail(id);

  const addToCartMutation = useAddToCart();

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { productId: id, quantity },
      {
        onSuccess: () => toast.success('Đã thêm vào giỏ hàng 🛒'),
        onError: (err) =>
          toast.error(
            err?.response?.data?.message || 'Không thể thêm vào giỏ hàng',
          ),
      },
    );
  };

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError || !product)
    return <p className="p-6 text-red-500">Không tìm thấy sản phẩm</p>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full rounded-lg object-cover"
      />

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl font-semibold mb-4">${product.price}</p>

        <p className="text-gray-600 mb-6">{product.description}</p>

        <div className="flex items-center gap-4 mb-6">
          <span>Số lượng:</span>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={addToCartMutation.isLoading}
          className="bg-black text-white px-6 py-3 rounded hover:opacity-90 disabled:opacity-50"
        >
          {addToCartMutation.isLoading ? 'Đang thêm...' : 'Add to Cart'}
        </button>
      </div>
    </main>
  );
};

export default ProductDetailPage;
