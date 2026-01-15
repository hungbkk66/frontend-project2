import React, { useState } from 'react';
import { Star, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import useRateProduct from '@/hooks/productHook/useRateProduct';

const RateProductModal = ({ isOpen, onClose, product, orderId }) => {
  const [rating, setRating] = useState(5); // Mặc định 5 sao
  const [hover, setHover] = useState(0); // Hiệu ứng hover sao

  const { mutate: rateProduct, isPending } = useRateProduct();

  if (!isOpen) return null;

  const handleSubmit = () => {
    rateProduct(
      {
        productId: product._id,
        orderId: orderId,
        rating: rating,
      },
      {
        onSuccess: () => {
          onClose(); // Đóng modal khi thành công
          setRating(5); // Reset
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">Đánh giá sản phẩm</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center gap-4">
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="w-20 h-20 object-cover rounded-lg border"
          />
          <p className="text-center font-medium text-gray-700 line-clamp-2">
            {product?.name}
          </p>

          {/* Star Selection */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110 focus:outline-none"
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hover || rating)
                      ? 'fill-yellow-400 text-yellow-400' // Sao vàng
                      : 'text-gray-300' // Sao xám
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 font-medium">
            {hover || rating} Sao
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-3 bg-gray-50">
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Gửi đánh giá'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RateProductModal;
