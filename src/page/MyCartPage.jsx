import React, { useState, useMemo } from 'react'; // Import thêm useMemo
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  Trash2,
  Store,
  ShoppingBag,
  ArrowRight,
  Loader2, // Import Icon Loading
} from 'lucide-react';
import { Button } from '../components/ui/button';
import toast from 'react-hot-toast'; // Import Toast

// ===== HOOKS =====
import useCartGroupedByShop from '@/hooks/cartHook/useCartGroupedByShop'; // Import hook bạn đã tạo

import { Separator } from '../components/ui/separator'; // Nếu có

import useRemoveCartItem from '@/hooks/cartHook/useRemoveCartItem';

import useCreateOrderFromCart from '@/hooks/orderHook/useCreateOrdersFromCart'; // Import Hook Checkout

const MyCartPage = () => {
  const navigate = useNavigate();

  // 1. Dữ liệu Cart
  const { data, isLoading, isError } = useCartGroupedByShop();

  // 2. Hook Xóa
  const { mutate: removeCartItem } = useRemoveCartItem();
  const [removingItemId, setRemovingItemId] = useState(null);

  // 3. Hook Checkout (MỚI)
  const { mutate: createOrder, isPending: isCheckingOut } =
    useCreateOrderFromCart();

  // 4. State lưu danh sách ID các món được chọn (MỚI)
  const [selectedItems, setSelectedItems] = useState([]);

  // Hàm format tiền
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  // --- LOGIC CHECKBOX (MỚI) ---

  // A. Chọn/Bỏ chọn 1 món
  const toggleItem = (itemId) => {
    setSelectedItems(
      (prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId) // Nếu có rồi thì bỏ ra
          : [...prev, itemId], // Chưa có thì thêm vào
    );
  };

  // B. Chọn/Bỏ chọn cả Shop
  const toggleShop = (itemsInShop) => {
    const shopItemIds = itemsInShop.map((item) => item._id);
    // Kiểm tra xem tất cả món trong shop này đã được chọn chưa
    const isAllShopSelected = shopItemIds.every((id) =>
      selectedItems.includes(id),
    );

    if (isAllShopSelected) {
      // Nếu chọn hết rồi -> Bỏ chọn tất cả món của shop này
      setSelectedItems((prev) =>
        prev.filter((id) => !shopItemIds.includes(id)),
      );
    } else {
      // Nếu chưa chọn hết -> Thêm tất cả món của shop này vào (lọc trùng)
      setSelectedItems((prev) => [...new Set([...prev, ...shopItemIds])]);
    }
  };

  // C. Chọn/Bỏ chọn tất cả (Select All)
  const handleSelectAll = () => {
    if (!data?.groups) return;
    // Lấy tất cả ID có trong giỏ hàng
    const allItemIds = data.groups.flatMap((g) => g.items.map((i) => i._id));

    if (selectedItems.length === allItemIds.length) {
      setSelectedItems([]); // Đang chọn hết -> Bỏ hết
    } else {
      setSelectedItems(allItemIds); // Chưa chọn hết -> Chọn hết
    }
  };

  // --- LOGIC TÍNH TỔNG TIỀN (CHỈ TÍNH MÓN ĐƯỢC CHỌN) ---
  const selectedTotal = useMemo(() => {
    if (!data?.groups) return 0;
    return data.groups.reduce((acc, group) => {
      const groupTotal = group.items.reduce((sum, item) => {
        // Chỉ cộng tiền nếu item._id nằm trong selectedItems
        return selectedItems.includes(item._id)
          ? sum + item.price * item.quantity
          : sum;
      }, 0);
      return acc + groupTotal;
    }, 0);
  }, [data, selectedItems]);

  // --- XỬ LÝ SỰ KIỆN ---

  const handleRemove = (cartItemId) => {
    if (!window.confirm('Remove this item?')) return;
    setRemovingItemId(cartItemId);
    removeCartItem(cartItemId, {
      onSettled: () => setRemovingItemId(null),
      onSuccess: () => {
        // Xóa xong thì bỏ nó khỏi danh sách đang chọn luôn (nếu có)
        setSelectedItems((prev) => prev.filter((id) => id !== cartItemId));
      },
    });
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items to checkout');
      return;
    }

    // Gửi danh sách ID được chọn lên Backend
    createOrder(selectedItems);
  };

  // --- RENDER ---

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-red-500 font-semibold">Failed to load cart data.</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  const cartGroups = data?.groups || [];

  // Kiểm tra trạng thái Select All để hiển thị checkbox tổng
  const allItemCount = cartGroups.flatMap((g) => g.items).length;
  const isAllSelected =
    allItemCount > 0 && selectedItems.length === allItemCount;

  if (cartGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
        <div className="bg-gray-100 p-6 rounded-full">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <Link to="/">
          <Button size="lg" className="mt-4">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Shopping Cart</h1>

        {/* --- CHECKBOX CHỌN TẤT CẢ --- */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex items-center gap-3">
          <input
            type="checkbox"
            className="w-5 h-5 accent-primary cursor-pointer"
            checked={isAllSelected}
            onChange={handleSelectAll}
          />
          <span className="font-medium text-gray-700">
            Select All ({allItemCount} items)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CỘT TRÁI: LIST SẢN PHẨM */}
          <div className="lg:col-span-2 space-y-6">
            {cartGroups.map((group) => {
              // Kiểm tra xem Shop này có đang được chọn full không
              const shopItemIds = group.items.map((i) => i._id);
              const isShopSelected = shopItemIds.every((id) =>
                selectedItems.includes(id),
              );

              return (
                <div
                  key={group.shop._id}
                  className="bg-white rounded-xl border border-gray-100"
                >
                  {/* SHOP HEADER */}
                  <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
                    {/* CHECKBOX SHOP */}
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-primary cursor-pointer"
                      checked={isShopSelected}
                      onChange={() => toggleShop(group.items)}
                    />
                    <img
                      src={group.shop.logo}
                      alt={group.shop.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-semibold">{group.shop.name}</span>
                  </div>

                  {group.items.map((item) => (
                    <div
                      key={item._id}
                      className="p-4 flex gap-4 border-b last:border-0 items-start"
                    >
                      {/* CHECKBOX ITEM LẺ */}
                      <div className="pt-8">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-primary cursor-pointer"
                          checked={selectedItems.includes(item._id)}
                          onChange={() => toggleItem(item._id)}
                        />
                      </div>

                      <img
                        src={item.product.imageUrl}
                        className="w-24 h-24 rounded-lg object-cover border border-gray-100"
                      />

                      <div className="flex-1 flex flex-col justify-between min-h-[6rem]">
                        <Link
                          to={`/product/${item.product._id}`}
                          className="font-medium line-clamp-2 hover:text-primary"
                        >
                          {item.product.name}
                        </Link>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-lg">
                              {item.price}đ
                            </span>
                            <span className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </span>
                          </div>

                          <button
                            onClick={() => handleRemove(item._id)}
                            disabled={
                              removingItemId === item._id || isCheckingOut
                            }
                            className="flex items-center gap-2 text-red-500 disabled:opacity-50 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          >
                            {removingItemId === item._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                            <span className="text-sm font-medium">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 text-right">
                    <span className="text-gray-500 text-sm mr-2">
                      Shop Total:
                    </span>
                    <span className="font-bold">
                      {formatCurrency(group.shopTotal)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CỘT PHẢI: SUMMARY & CHECKOUT */}
          <div>
            <div className="bg-white p-6 rounded-xl border sticky top-4 shadow-sm">
              <h2 className="text-lg font-bold mb-4 border-b pb-2">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Selected Items</span>
                  <span className="font-medium">{selectedItems.length}</span>
                </div>

                {/* HIỂN THỊ TỔNG TIỀN DỰA TRÊN SELECTION */}
                <div className="flex justify-between items-center text-primary font-bold text-xl">
                  <span>Total</span>
                  <span>{selectedTotal}đ</span>
                </div>
              </div>

              {/* NÚT CHECKOUT */}
              <Button
                className="w-full h-12 text-lg font-semibold shadow-md"
                onClick={handleCheckout}
                // Disable nếu chưa chọn món nào HOẶC đang loading
                disabled={isCheckingOut || selectedItems.length === 0}
              >
                {isCheckingOut ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Checkout ({selectedItems.length}){' '}
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCartPage;
